import httpx
from typing import Optional, Dict, Any, List
from app.core.config import OLLAMA_HOST, LLM_MODEL

class LLMService:
    """Service for interacting with LLM APIs for text summarization using Ollama"""
    
    def __init__(self):
        self.api_base = OLLAMA_HOST
        self.model = LLM_MODEL
    

    def get_page_number(self, text: str, max_tokens: int = 500) -> str:
        """
        Extract text up to the specified page
        
        Args:
            text: The text to extract from
            max_tokens: Maximum length of the response
            
        Returns:
            Page number
        """
        prompt = f"""You are tasked at figuring out at which point important text in a book begins. Important text is the text that
        includes only content text and excludes the preface, content page, dedication, acknowledgments, and other non-content text. 
        Return the page number of the first page of important text.
        Output response should be Page <number> where <number> is the page number of the first page of important text.
        {text}"""

        try:
            # Using httpx for the API call to Ollama
            url = f"{self.api_base}/api/generate"
            payload = {
                "model": self.model,
                "prompt": prompt,
                "system": "You are a helpful assistant that provides concise book summaries.",
                "stream": False,
                "options": {
                    "num_predict": max_tokens,
                    "temperature": 0.7
                }
            }
            
            print(f"Calling Ollama API at {url} with model {self.model}")
            
            try:
                response = httpx.post(url, json=payload, timeout=60.0)
                print(f"Ollama API response status: {response.status_code}")
                
                # If we got an error response, print the details
                if response.status_code >= 400:
                    print(f"Ollama API error: {response.text}")
                    raise Exception(f"Ollama API returned error {response.status_code}: {response.text}")
                    
                response.raise_for_status()
                result = response.json()
                first_page_of_important_text = result['response']
                return first_page_of_important_text

            except httpx.RequestError as e:
                print(f"Request error to Ollama API: {e}")
                raise Exception(f"Failed to connect to Ollama API: {e}. Make sure Ollama is running at {self.api_base}")
            except httpx.HTTPStatusError as e:
                print(f"HTTP error from Ollama API: {e}")
                raise Exception(f"Ollama API returned error {e.response.status_code}: {e.response.text}")
            
        except Exception as e:
            print(f"Error in LLMService.summarize_text: {str(e)}")
            raise Exception(f"Error finding content-only text with Ollama: {str(e)}")
    
    def summarize_text(self, text: str, max_tokens: int = 500) -> str:
        """
        Summarize the provided text using Ollama LLM
        
        Args:
            text: The text to summarize
            max_tokens: Maximum length of the summary
            
        Returns:
            A summary of the text
        """
        prompt = f"""You are tasked at summarizing text from a book. Focus on key plot points, themes, and character development. 
        Present the output in a nicely formatted manner as shown here:
        Sample output:
        This summary is about <book_name> by <author_name> and is summarized up to page <page_number>
        Key plot points: <plot_points>
        Themes: <themes>
        Character development: <character_development>
      
        {text}"""
        
        try:
            # Using httpx for the API call to Ollama
            url = f"{self.api_base}/api/generate"
            payload = {
                "model": self.model,
                "prompt": prompt,
                "system": "You are a helpful assistant that provides concise book summaries.",
                "stream": False,
                "options": {
                    "num_predict": max_tokens,
                    "temperature": 0.7
                }
            }
            
            print(f"Calling Ollama API at {url} with model {self.model}")
            
            try:
                response = httpx.post(url, json=payload, timeout=60.0)
                print(f"Ollama API response status: {response.status_code}")
                
                # If we got an error response, print the details
                if response.status_code >= 400:
                    print(f"Ollama API error: {response.text}")
                    raise Exception(f"Ollama API returned error {response.status_code}: {response.text}")
                    
                response.raise_for_status()
                result = response.json()
                
                return result.get("response", "No summary generated")
            except httpx.RequestError as e:
                print(f"Request error to Ollama API: {e}")
                raise Exception(f"Failed to connect to Ollama API: {e}. Make sure Ollama is running at {self.api_base}")
            except httpx.HTTPStatusError as e:
                print(f"HTTP error from Ollama API: {e}")
                raise Exception(f"Ollama API returned error {e.response.status_code}: {e.response.text}")
            
        except Exception as e:
            print(f"Error in LLMService.summarize_text: {str(e)}")
            raise Exception(f"Error generating summary with Ollama: {str(e)}")
