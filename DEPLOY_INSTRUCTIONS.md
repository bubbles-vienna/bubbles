# Bubbles Website - GitHub Pages Deployment Guide

## Quick Start (Windows)

### Prerequisites
1. **Git** - [Download here](https://git-scm.com/download/win)
2. **Python 3.x** - [Download here](https://www.python.org/)
3. **GitHub Account** - Already have one ✓

### Step 1: Create GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Fill in:
   - **Name**: `Bubbles Website Deploy`
   - **Expiration**: 90 days (or longer)
   - **Scopes**: Check `repo` (full control)
4. Click **"Generate token"**
5. **Copy the token** (you won't see it again!)

### Step 2: Run Deployment Script

1. Open PowerShell or Command Prompt
2. Navigate to the bubbles-website folder:
   ```powershell
   cd "path\to\bubbles-website"
   ```
3. Run the deployment:
   ```powershell
   python deploy_github_pages.py
   ```

### Step 3: Follow the Script Prompts

The script will ask for:
- **GitHub Username**: Your GitHub username
- **Personal Access Token**: The token you just created. It is used to create the repository through GitHub's API and is not saved locally.
- **Save credentials**: Choose `y` to save your username for future deployments

### Step 4: Your Site is Live! 🎉

After the script completes, your website is automatically live at:

```
https://YOUR-USERNAME.github.io/
```

**No additional steps needed!** The script automatically:
- Creates a repository named `YOUR-USERNAME.github.io`
- Enables GitHub Pages automatically
- Deploys your site

*(It may take 1-2 minutes to go live)*

---

## What Gets Created

- Repository: `https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io`
- Live Site: `https://YOUR-USERNAME.github.io/` (clean URL, no repo name!)

---

## What the Script Does

✓ Initializes a git repository  
✓ Stages and commits all your files  
✓ Creates repository as `USERNAME.github.io` (automatically enables GitHub Pages)  
✓ Creates the GitHub repository through the GitHub API  
✓ Configures the GitHub remote and pushes your commit  
✓ Pushes to GitHub  
✓ Saves credentials locally (encrypted)  
✓ Generates deployment links  

---

## Troubleshooting

### "Git not found"
- Install Git: https://git-scm.com/download/win
- Restart your terminal after installation

### "Python not found"
- Install Python: https://www.python.org/
- During installation, check **"Add Python to PATH"**
- Restart your terminal

### "Authentication failed"
- Verify your Personal Access Token is correct
- Make sure you copied it exactly (no extra spaces)
- Token must have `repo` scope

---

## Security Notes

✓ Credentials are stored locally in: `~/.bubbles_github_config.json`  
✓ File has restricted permissions (600 on Unix, read-only on Windows)  
✓ Token never appears in your command history  
✓ Never commit the config file to the repository  

---

## Links Reference

After deployment, you'll have:

| Link | Purpose |
|------|---------|
| `https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io` | Repository code |
| `https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io/settings` | Repo settings |
| `https://YOUR-USERNAME.github.io/` | **Your live website** |

---

## Need Help?

- GitHub Pages Docs: https://docs.github.com/en/pages
- Personal Access Tokens: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
- Git Basics: https://git-scm.com/book/en/v2/Getting-Started-The-Basics

