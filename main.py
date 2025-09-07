from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os, json

app = FastAPI()

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Load ARM rules ===
with open("arm_rules.json", "r") as f:
    rules = json.load(f)

class WeatherInput(BaseModel):
    weather: list[str]

@app.get("/api/rules")
def get_rules():
    return rules

@app.post("/api/predict")
def predict_weather_to_symptom(input: WeatherInput):
    matches = [
        r for r in rules
        if any(w.lower() in r['antecedents_str'].lower() for w in input.weather)
    ]
    return {"input_weather": input.weather, "matched_rules": matches}

# === Serve React frontend ===
app.mount("/", StaticFiles(directory="covid-arm-frontend/build", html=True), name="frontend")

@app.get("/{full_path:path}")
def react_app(full_path: str):
    return FileResponse(os.path.join("covid-arm-frontend/build", "index.html"))

