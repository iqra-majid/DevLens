# DevLens GitHub Analyzer

DevLens GitHub Analyzer is a full-stack web application designed to analyze GitHub profiles, repositories, and developer activity to generate comprehensive insights and metrics.

---

## Project Structure

This repository is structured as a full-stack project, containing both backend and frontend applications:

```text
devlens-github-analyzer/
├── backend/                  # FastAPI backend application
│   ├── app/
│   │   ├── api/              # API router and endpoints (e.g., github.py)
│   │   ├── services/         # Business logic and external API helpers (e.g., github_service.py)
│   │   └── main.py           # Application entrypoint & CORS middleware setup
│   └── requirements.txt      # Python dependencies
└── frontend/                 # Frontend client application (Coming soon)
```

### Files Structure

Here are the details of the backend files and routing system:

1. **`github.py`**: Handles all GitHub-related API routes.
2. **`/github/{username}`**: The endpoint used to analyze a GitHub profile. This route calls the `analyze_profile` function from `github_service.py`.
3. **`github_service.py`**: Houses the core business logic and service implementations (such as `analyze_profile`).

---

## Getting Started

### Backend Setup

#### 1. Create a Python Virtual Environment
Navigate to the `backend` directory and run:
```bash
python3 -m venv venv
```

#### 2. Activate the Virtual Environment
```bash
source venv/bin/activate
```

#### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

#### 4. Run the FastAPI server
```bash
uvicorn app.main:app --reload
```
Once the server is running:
- Access the API root at: http://127.0.0.1:8000/
- Access the interactive Swagger API documentation at: http://127.0.0.1:8000/docs

### VS Code Setup (Fixing Import Warnings)

If VS Code shows import warnings such as `Cannot find module 'fastapi'`, it is because it is using the system Python interpreter rather than the workspace virtual environment.

To resolve this:
1. Press **`Ctrl + Shift + P`** (or **`Cmd + Shift + P`** on macOS) to open the Command Palette.
2. Select **`Python: Select Interpreter`**.
3. Click **`Enter interpreter path...`** and enter:
   ```text
   /home/iqra/work/devlens-github-analyzer/backend/venv/bin/python
   ```
   *(Alternatively, you can select the workspace-relative path if auto-detected: `./backend/venv/bin/python`)*
4. Open the Command Palette and run **`Developer: Reload Window`** to apply changes.

---

### Frontend Setup
*(Frontend setup instructions will be updated here as the frontend client is developed.)*
