import os

import fitz
import google.generativeai as genai
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


def parse_allowed_origins() -> list[str]:
    raw = os.getenv("ALLOWED_ORIGINS", "*").strip()
    if raw == "*":
        return ["*"]
    origins = [origin.strip() for origin in raw.split(",") if origin.strip()]
    return origins or ["*"]


allowed_origins = parse_allowed_origins()
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


def configure_gemini() -> None:
    api_key = os.getenv("GEMINI_API_KEY", "").strip()
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not configured.")
    genai.configure(api_key=api_key)


def extract_text_from_pdf(file_bytes: bytes) -> str:
    doc = fitz.open(stream=file_bytes, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text.lower().strip()


def ai_resume_analysis(text: str) -> str:
    configure_gemini()
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = f"""
Analyze this resume.

Give:
1. Resume Summary
2. Technical Skills
3. Recommended Career Role
4. Missing Skills
5. Improvement Suggestions

Resume:
{text}
"""
    response = model.generate_content(prompt)
    output = getattr(response, "text", "")
    if not output:
        raise RuntimeError("Gemini returned an empty analysis.")
    return output


SKILL_DB = [
    "python",
    "java",
    "javascript",
    "react",
    "node",
    "fastapi",
    "django",
    "flask",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "gcp",
    "sql",
    "mongodb",
    "html",
    "css",
    "git",
    "linux",
    "ci/cd",
    "devops",
]


def detect_skills(text: str) -> list[str]:
    return list({skill for skill in SKILL_DB if skill in text})


def calculate_score(skills: list[str]) -> int:
    score = len(skills) * 10
    if "python" in skills:
        score += 10
    if "docker" in skills:
        score += 10
    if "aws" in skills:
        score += 10
    if "kubernetes" in skills:
        score += 15
    if "ci/cd" in skills:
        score += 10
    if "git" in skills:
        score += 5
    return min(score, 100)


def predict_roles(skills: list[str]) -> dict[str, int]:
    roles = {
        "DevOps Engineer": 0,
        "Backend Developer": 0,
        "Frontend Developer": 0,
        "Data Analyst": 0,
    }

    if "docker" in skills:
        roles["DevOps Engineer"] += 25
    if "kubernetes" in skills:
        roles["DevOps Engineer"] += 25
    if "aws" in skills:
        roles["DevOps Engineer"] += 25
    if "linux" in skills:
        roles["DevOps Engineer"] += 15
    if "ci/cd" in skills:
        roles["DevOps Engineer"] += 10

    if "python" in skills:
        roles["Backend Developer"] += 25
    if "fastapi" in skills:
        roles["Backend Developer"] += 25
    if "django" in skills:
        roles["Backend Developer"] += 20
    if "sql" in skills:
        roles["Backend Developer"] += 15
    if "mongodb" in skills:
        roles["Backend Developer"] += 15

    if "react" in skills:
        roles["Frontend Developer"] += 30
    if "javascript" in skills:
        roles["Frontend Developer"] += 25
    if "html" in skills:
        roles["Frontend Developer"] += 20
    if "css" in skills:
        roles["Frontend Developer"] += 20

    if "python" in skills:
        roles["Data Analyst"] += 30
    if "sql" in skills:
        roles["Data Analyst"] += 30

    return roles


def skill_gap_analysis(skills: list[str]) -> dict[str, list[str]]:
    role_requirements = {
        "DevOps Engineer": ["docker", "kubernetes", "aws", "linux", "ci/cd", "terraform", "jenkins"],
        "Backend Developer": ["python", "fastapi", "sql", "mongodb", "docker"],
        "Frontend Developer": ["react", "javascript", "html", "css"],
    }

    gaps: dict[str, list[str]] = {}
    for role, required_skills in role_requirements.items():
        gaps[role] = [skill for skill in required_skills if skill not in skills]
    return gaps


@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="Missing filename.")
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files supported.")

    content = await file.read()

    try:
        resume_text = extract_text_from_pdf(content)
    except Exception as exc:
        raise HTTPException(status_code=400, detail="Invalid PDF file.") from exc

    if not resume_text:
        raise HTTPException(status_code=400, detail="The uploaded PDF has no extractable text.")

    try:
        ai_analysis = ai_resume_analysis(resume_text)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"AI analysis failed: {exc}") from exc

    skills = detect_skills(resume_text)
    score = calculate_score(skills)
    roles = predict_roles(skills)
    skill_gaps = skill_gap_analysis(skills)

    if score < 40:
        level = "Beginner"
    elif score < 70:
        level = "Intermediate"
    else:
        level = "Advanced"

    return {
        "filename": file.filename,
        "skills_detected": skills,
        "score": score,
        "level": level,
        "career_matches": roles,
        "skill_gaps": skill_gaps,
        "ai_analysis": ai_analysis,
    }


@app.get("/healthz")
def healthz():
    return {"status": "ok"}
