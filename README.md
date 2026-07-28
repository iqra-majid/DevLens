# Backend

## Create a Python virtual environment
To create the virtual environment inside the `backend` directory, run:
```bash
python3 -m venv venv
```

## Activate the virtual environment
To activate the virtual environment, run:
```bash
source venv/bin/activate
```

## Install dependencies
To install the initial dependencies (FastAPI, Uvicorn, etc.), run:
```bash
pip install -r requirements.txt
```

## Run the FastAPI server
To start the development server, run:
```bash
uvicorn app.main:app --reload
```
Once the server is running:
- Access the API root at: http://127.0.0.1:8000/
- Access the interactive Swagger API documentation at: http://127.0.0.1:8000/docs

## VS Code Setup (Fixing Import Warnings)
If VS Code shows import warnings such as `Cannot find module 'fastapi'`, it is because it's using the system Python interpreter rather than the virtual environment.

To resolve this:
1. Press **`Ctrl + Shift + P`** (or **`Cmd + Shift + P`** on macOS) to open the Command Palette.
2. Select **`Python: Select Interpreter`**.
3. Click **`Enter interpreter path...`** and enter:
   ```text
   /home/iqra/work/devlens-github-analyzer/backend/venv/bin/python
   ```
   *(Alternatively, you can select the workspace-relative path if auto-detected: `./backend/venv/bin/python`)*
4. Open the Command Palette and run **`Developer: Reload Window`** to apply changes.



