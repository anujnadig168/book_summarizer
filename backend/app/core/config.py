import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# API settings
API_PREFIX = "/api"

# Book source settings
GUTENBERG_API_URL = "https://gutendex.com/books/"

# LLM settings
# Ollama settings (local deployment)
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")
LLM_MODEL = os.getenv("LLM_MODEL", "llama2")

# Project directories
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
