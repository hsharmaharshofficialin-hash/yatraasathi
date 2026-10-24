from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    DATABASE_URL: str = "postgresql://postgres:postgres@127.0.0.1:5432/app_db"
    FRONTEND_ORIGIN: str = "http://localhost:3000"
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o-mini"
    PORT: int = 4000


def get_settings() -> Settings:
    return Settings()
