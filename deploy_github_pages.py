#!/usr/bin/env python3
"""
GitHub Pages Setup Script for Bubbles Website
Automates git initialization, credential handling, and pushing to GitHub
"""

import os
import subprocess
import json
from pathlib import Path
import getpass

# Configuration file for storing credentials
CONFIG_FILE = Path.home() / ".bubbles_github_config.json"

def load_config():
    """Load stored GitHub credentials"""
    if CONFIG_FILE.exists():
        try:
            with open(CONFIG_FILE, 'r') as f:
                return json.load(f)
        except:
            return {}
    return {}

def save_config(config):
    """Save GitHub credentials to local config file"""
    with open(CONFIG_FILE, 'w') as f:
        json.dump(config, f, indent=2)
    # Set restrictive permissions on Windows
    os.chmod(CONFIG_FILE, 0o600)
    print(f"✓ Credentials saved to: {CONFIG_FILE}")

def get_credentials():
    """Get GitHub credentials from user or load from saved config"""
    config = load_config()
    
    print("\n" + "="*60)
    print("GITHUB CREDENTIALS")
    print("="*60)
    
    # GitHub Username
    if 'github_username' in config:
        use_saved = input(f"\nUse saved username '{config['github_username']}'? (y/n): ").strip().lower()
        if use_saved == 'y':
            username = config['github_username']
        else:
            username = input("Enter your GitHub username: ").strip()
    else:
        username = input("\nEnter your GitHub username: ").strip()
    
    if not username:
        print("✗ Username cannot be empty!")
        return None, None
    
    # GitHub Personal Access Token (or password)
    print("\nFor secure authentication, you need a GitHub Personal Access Token.")
    print("Create one here: https://github.com/settings/tokens")
    print("  • Scopes needed: 'repo' (full control of private repositories)")
    print("  • Name it: 'Bubbles Website Deploy'")
    
    token = getpass.getpass("\nEnter your GitHub Personal Access Token (will not be displayed): ").strip()
    
    if not token:
        print("✗ Token cannot be empty!")
        return None, None
    
    # Save credentials
    save = input("\nSave credentials locally for future use? (y/n): ").strip().lower()
    if save == 'y':
        config['github_username'] = username
        config['github_token'] = token
        save_config(config)
    
    return username, token

def init_git_repo(repo_path):
    """Initialize git repository"""
    print("\n" + "="*60)
    print("INITIALIZING GIT REPOSITORY")
    print("="*60)
    
    os.chdir(repo_path)
    
    try:
        # Check if already a git repo
        if (Path(repo_path) / ".git").exists():
            print("✓ Git repository already initialized")
        else:
            subprocess.run(["git", "init"], check=True, capture_output=True)
            print("✓ Git repository initialized")
        
        # Configure git user
        subprocess.run(["git", "config", "user.name", "Bubbles Deploy Bot"], 
                      check=False, capture_output=True)
        subprocess.run(["git", "config", "user.email", "deploy@bubbles.local"], 
                      check=False, capture_output=True)
        
        return True
    except Exception as e:
        print(f"✗ Error initializing git: {e}")
        return False

def add_and_commit(repo_path):
    """Add files and create initial commit"""
    print("\n" + "="*60)
    print("STAGING AND COMMITTING FILES")
    print("="*60)
    
    os.chdir(repo_path)
    
    try:
        # Add all files
        subprocess.run(["git", "add", "."], check=True, capture_output=True)
        print("✓ Files staged")
        
        # Check if there are changes to commit
        result = subprocess.run(["git", "status", "--porcelain"], 
                               capture_output=True, text=True)
        
        if result.stdout.strip():
            # Create commit
            subprocess.run(
                ["git", "commit", "-m", "Initial commit: Bubbles website ready for GitHub Pages"],
                check=True, capture_output=True
            )
            print("✓ Commit created")
        else:
            print("✓ No changes to commit (repository may already be up to date)")
        
        return True
    except Exception as e:
        print(f"✗ Error committing: {e}")
        return False

def push_to_github(repo_path, username, token):
    """Push repository to GitHub"""
    print("\n" + "="*60)
    print("PUSHING TO GITHUB")
    print("="*60)
    
    os.chdir(repo_path)
    
    # Repository name for clean GitHub Pages URL
    repo_name = f"{username}.github.io"
    
    try:
        # Ensure main branch
        try:
            subprocess.run(["git", "rev-parse", "--verify", "main"], 
                          check=True, capture_output=True)
        except:
            subprocess.run(["git", "branch", "-M", "main"], 
                          check=True, capture_output=True)
        
        print(f"  Repository: {repo_name}")
        print(f"  GitHub URL: https://github.com/{username}/{repo_name}")
        
        # Set up remote with authentication
        remote_url = f"https://{username}:{token}@github.com/{username}/{repo_name}.git"
        
        # Remove existing remote if it exists
        try:
            subprocess.run(["git", "remote", "remove", "origin"], 
                          capture_output=True)
        except:
            pass
        
        # Add new remote
        subprocess.run(["git", "remote", "add", "origin", remote_url], 
                      check=True, capture_output=True)
        print("✓ Remote configured")
        
        # Push to GitHub
        result = subprocess.run(
            ["git", "push", "-u", "origin", "main"],
            capture_output=True, text=True
        )
        
        if result.returncode == 0:
            print("✓ Successfully pushed to GitHub!")
            return True
        else:
            print(f"✗ Push failed: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"✗ Error pushing to GitHub: {e}")
        return False

def enable_github_pages_instructions(username, repo_name):
    """Print instructions for enabling GitHub Pages"""
    print("\n" + "="*60)
    print("GITHUB PAGES SETUP (Automatic)")
    print("="*60)
    
    repo_url = f"https://github.com/{username}/{repo_name}"
    pages_url = f"https://{username}.github.io/"
    settings_url = f"{repo_url}/settings/pages"
    
    print(f"\n✓ Your GitHub Pages site is configured!")
    print(f"\n🌐 Your live website:")
    print(f"   {pages_url}\n")
    
    print(f"📚 Repository:")
    print(f"   {repo_url}\n")
    
    print("Note: It may take 1-2 minutes for the site to go live.")
    print("No additional configuration needed—GitHub Pages is auto-enabled!\n")
    
    return pages_url

def display_summary(username, repo_name):
    """Display deployment summary and links"""
    print("\n" + "="*60)
    print("DEPLOYMENT SUMMARY")
    print("="*60)
    
    repo_url = f"https://github.com/{username}/{repo_name}"
    pages_url = f"https://{username}.github.io/"
    
    print(f"\n✓ Repository: {repo_url}")
    print(f"✓ Live Website: {pages_url}")
    print(f"\n📝 Links:")
    print(f"   Repository: {repo_url}")
    print(f"   Settings:   {repo_url}/settings")
    print(f"   Pages:      {repo_url}/settings/pages")
    print(f"\n🌐 Live Site:")
    print(f"   {pages_url}")
    
    # Save links to file
    links_file = Path("DEPLOYMENT_LINKS.txt")
    with open(links_file, 'w') as f:
        f.write("BUBBLES WEBSITE - DEPLOYMENT LINKS\n")
        f.write("=" * 50 + "\n\n")
        f.write(f"Repository: {repo_url}\n")
        f.write(f"Live Site: {pages_url}\n")
        f.write(f"Settings: {repo_url}/settings\n")
        f.write(f"Pages Settings: {repo_url}/settings/pages\n\n")
        f.write("CREDENTIALS SAVED\n")
        f.write("=" * 50 + "\n")
        f.write(f"Config file: {CONFIG_FILE}\n")
        f.write("(Securely stored with restricted permissions)\n")
    
    print(f"\n✓ Links saved to: {links_file}")

def main():
    """Main deployment workflow"""
    print("\n" + "█"*60)
    print("█" + " "*58 + "█")
    print("█" + "  BUBBLES WEBSITE - GITHUB PAGES DEPLOYMENT".center(58) + "█")
    print("█" + " "*58 + "█")
    print("█"*60)
    
    # Get current directory (should be repo root)
    repo_path = Path.cwd()
    print(f"\nWorking directory: {repo_path}\n")
    
    # Verify HTML file exists
    if not (repo_path / "index.html").exists():
        print("✗ Error: index.html not found in current directory!")
        print("  Make sure you're in the bubbles-website directory")
        return False
    
    # Step 1: Get credentials
    username, token = get_credentials()
    if not username or not token:
        return False
    
    # Step 2: Initialize git
    if not init_git_repo(repo_path):
        return False
    
    # Step 3: Add and commit
    if not add_and_commit(repo_path):
        return False
    
    # Step 4: Push to GitHub
    if not push_to_github(repo_path, username, token):
        return False
    
    # Step 5: Display summary
    repo_name = f"{username}.github.io"
    display_summary(username, repo_name)
    
    # Step 6: Instructions for GitHub Pages
    enable_github_pages_instructions(username, repo_name)
    
    print("="*60)
    print("✓ DEPLOYMENT COMPLETE!")
    print("="*60)
    print("\n✨ Your site is now live at:")
    print(f"   https://{username}.github.io/")
    print("\nNo further steps needed—GitHub Pages is auto-enabled!")
    print("Site goes live in 1-2 minutes.\n")
    print("="*60 + "\n")
    
    return True

if __name__ == "__main__":
    try:
        success = main()
        exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n\n✗ Deployment cancelled by user")
        exit(1)
    except Exception as e:
        print(f"\n✗ Unexpected error: {e}")
        exit(1)
