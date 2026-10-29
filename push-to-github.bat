@echo off
chcp 65001 >nul
echo ========================================================
echo Pushing Arabic AI QA Agency (Private Repo) to GitHub...
echo Account: abdelrhmanmaroxo-spec
echo ========================================================
cd /d "%~dp0"

git init -b main
git config user.name "Abdelrhman Essam Ali"
git config user.email "abdelrhman.maroxo@gmail.com"
git add .
git commit -m "Initial commit: Full-Stack Arabic & Multimodal AI Evaluation & QA Platform (Owner Edition)"

where gh >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Creating Private repository via GitHub CLI (gh) and pushing...
    gh repo create abdelrhmanmaroxo-spec/arabic-ai-qa-agency --private --source=. --remote=origin --push
) else (
    echo GitHub CLI (gh) not found. Using standard Git push...
    echo Make sure you created an empty Private repo at: https://github.com/new named arabic-ai-qa-agency
    git remote remove origin 2>nul
    git remote add origin https://github.com/abdelrhmanmaroxo-spec/arabic-ai-qa-agency.git
    git branch -M main
    git push -u origin main
)

echo ========================================================
echo Done! Check: https://github.com/abdelrhmanmaroxo-spec/arabic-ai-qa-agency
echo ========================================================
pause
