@echo off
setlocal
cd /d "%~dp0"
if errorlevel 1 exit /b 1

echo Deploying Bubbles website to GitHub...
python server.py --deploy
set "deploy_result=%errorlevel%"

echo.
if "%deploy_result%"=="0" (
    echo Command completed. GitHub Pages may take a few minutes to update.
) else (
    echo Deployment failed. See the error above.
)
pause
exit /b %deploy_result%
