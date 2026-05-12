from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import fitz  # PDF reader (PyMuPDF)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# STEP 1: Extract PDF text
# -----------------------------
def extract_text_from_pdf(file_bytes):

    doc = fitz.open(stream=file_bytes, filetype="pdf")

    text = ""

    for page in doc:
        text += page.get_text()

    return text.lower()


# -----------------------------
# STEP 2: Skill Database
# -----------------------------
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
    "devops"
]


# -----------------------------
# STEP 3: Detect Skills
# -----------------------------
def detect_skills(text):

    found_skills = []

    for skill in SKILL_DB:

        if skill in text:
            found_skills.append(skill)

    return list(set(found_skills))


# -----------------------------
# STEP 4: Resume Scoring Engine
# -----------------------------
def calculate_score(skills):

    score = 0

    # base score
    score += len(skills) * 10

    # bonus points
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


# -----------------------------
# STEP 5: Career Role Prediction
# -----------------------------
def predict_roles(skills):

    roles = {
        "DevOps Engineer": 0,
        "Backend Developer": 0,
        "Frontend Developer": 0,
        "Data Analyst": 0
    }

    # -----------------------------
    # DevOps Engineer
    # -----------------------------
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

    # -----------------------------
    # Backend Developer
    # -----------------------------
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

    # -----------------------------
    # Frontend Developer
    # -----------------------------
    if "react" in skills:
        roles["Frontend Developer"] += 30

    if "javascript" in skills:
        roles["Frontend Developer"] += 25

    if "html" in skills:
        roles["Frontend Developer"] += 20

    if "css" in skills:
        roles["Frontend Developer"] += 20

    # -----------------------------
    # Data Analyst
    # -----------------------------
    if "python" in skills:
        roles["Data Analyst"] += 30

    if "sql" in skills:
        roles["Data Analyst"] += 30

    return roles


# -----------------------------
# STEP 6: Skill Gap Analyzer
# -----------------------------
def skill_gap_analysis(skills):

    role_requirements = {

        "DevOps Engineer": [
            "docker",
            "kubernetes",
            "aws",
            "linux",
            "ci/cd",
            "terraform",
            "jenkins"
        ],

        "Backend Developer": [
            "python",
            "fastapi",
            "sql",
            "mongodb",
            "docker"
        ],

        "Frontend Developer": [
            "react",
            "javascript",
            "html",
            "css"
        ]
    }

    gaps = {}

    for role, required_skills in role_requirements.items():

        missing = []

        for skill in required_skills:

            if skill not in skills:
                missing.append(skill)

        gaps[role] = missing

    return gaps


# -----------------------------
# API ROUTE
# -----------------------------
@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    print("🔥 NEW CODE IS RUNNING")

    # read uploaded file
    content = await file.read()

    # extract text from PDF
    resume_text = extract_text_from_pdf(content)

    # detect skills
    skills = detect_skills(resume_text)

    # calculate resume score
    score = calculate_score(skills)

    # predict career roles
    roles = predict_roles(skills)

    # analyze skill gaps
    skill_gaps = skill_gap_analysis(skills)

    # determine level
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
        "skill_gaps": skill_gaps
    }