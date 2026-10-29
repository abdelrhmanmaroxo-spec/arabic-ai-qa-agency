#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
echo "========================================================"
echo "Pushing Arabic AI QA Agency (Private Repo) to GitHub..."
echo "Account: abdelrhmanmaroxo-spec"
echo "========================================================"

git init -b main
git config user.name "Abdelrhman Essam Ali"
git config user.email "abdelrhman.maroxo@gmail.com"
git add .
git commit -m "Initial commit: Full-Stack Arabic & Multimodal AI Evaluation & QA Platform (Owner Edition)" || true

if command -v gh >/dev/null 2>&1; then
  echo "Creating Private repository via GitHub CLI (gh) and pushing..."
  gh repo create abdelrhmanmaroxo-spec/arabic-ai-qa-agency --private --source=. --remote=origin --push
else
  echo "Using standard Git push..."
  git remote remove origin 2>/dev/null || true
  git remote add origin https://github.com/abdelrhmanmaroxo-spec/arabic-ai-qa-agency.git
  git branch -M main
  git push -u origin main
fi

echo "Done! Check: https://github.com/abdelrhmanmaroxo-spec/arabic-ai-qa-agency"
