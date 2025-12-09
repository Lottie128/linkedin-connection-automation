from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()


class LinkedInCredentials(BaseModel):
    email: str
    password: str


class TargetFilter(BaseModel):
    titles: List[str]
    locations: List[str] = []


@app.post("/api/start-blitz")
async def start_blitz(creds: LinkedInCredentials, target: TargetFilter):
    # TODO: Implement LinkedIn automation logic using Playwright or Selenium
    # This should:
    # 1. Log in with provided credentials
    # 2. Search for profiles matching titles/locations
    # 3. Send up to 100 connection requests/day
    # 4. Respect rate limits and random delays
    raise HTTPException(status_code=501, detail="Automation logic not implemented yet")


@app.get("/api/health")
async def health():
    return {"status": "ok"}
