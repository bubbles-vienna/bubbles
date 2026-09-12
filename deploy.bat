@echo off
REM Bubbles Website - GitHub Pages Deployment Script for Windows

echo.
echo ================================================================
echo  BUBBLES WEBSITE - GITHUB PAGES DEPLOYMENT
echo ================================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python from https://www.python.org/
    pause
    exit /b 1
)

REM Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/download/win
    pause
    exit /b 1
)

REM Run the deployment script
echo Running deployment script...
echo.

python deploy_github_pages.py

if %errorlevel% equ 0 (
    echo.
    echo [SUCCESS] Deployment script completed!
) else (
    echo.
    echo [ERROR] Deployment script failed with exit code %errorlevel%
)

pause
