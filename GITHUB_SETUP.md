# GitHub Setup Guide

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `svkb-associates` (or your preferred name)
   - **Description**: "High-converting chartered accountant agency website with admin dashboard"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

## Step 2: Push Your Code to GitHub

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

### Option A: If you haven't set up the remote yet

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/svkb-associates.git

# Rename the default branch to main (if needed)
git branch -M main

# Push your code
git push -u origin main
```

### Option B: If you prefer SSH (recommended for frequent pushes)

```bash
# Add the remote repository using SSH
git remote add origin git@github.com:YOUR_USERNAME/svkb-associates.git

# Rename the default branch to main (if needed)
git branch -M main

# Push your code
git push -u origin main
```

## Step 3: Verify

1. Go to your GitHub repository page
2. You should see all your files uploaded
3. The `.env` file should **NOT** be visible (it's in .gitignore)

## Important Notes

✅ **What's Already Protected:**
- `.env` file (contains secrets - won't be pushed)
- `node_modules/` (dependencies - too large)
- `.next/` (build files)
- Database files (`*.db`)

⚠️ **Before Pushing:**
- Make sure your `.env` file is not committed (it's in .gitignore)
- Review sensitive data in your code
- Consider adding a LICENSE file if needed

## Future Updates

To push future changes:

```bash
# Stage your changes
git add .

# Commit with a message
git commit -m "Description of your changes"

# Push to GitHub
git push
```

## Troubleshooting

### If you get authentication errors:
- Use a Personal Access Token instead of password
- Or set up SSH keys for GitHub

### If you need to change the remote URL:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/svkb-associates.git
```

### To check your remote:
```bash
git remote -v
```

