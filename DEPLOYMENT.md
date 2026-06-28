# 🚀 Euromonitor Technical Assessment Platform — Deployment Guide

## Free Deployment Options

### Option 1: GitHub Pages (Recommended — Free & Easy)

1. **Create a GitHub repository** at https://github.com/new
2. **Push this project** to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. **Enable GitHub Pages:**
   - Go to repo → Settings → Pages
   - Source: select "GitHub Actions"
4. **Create the workflow file** `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   permissions:
     contents: read
     pages: write
     id-token: write
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
         - run: npm install
         - run: npm run build
         - uses: actions/upload-pages-artifact@v3
           with:
             path: dist
         - uses: actions/deploy-pages@v4
   ```
5. Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

### Option 2: Netlify (Free tier — drag & drop)

1. Run `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag the `dist/` folder
4. Done! You get a free `.netlify.app` URL

### Option 3: Vercel (Free tier)

1. Go to https://vercel.com
2. Import your GitHub repo
3. It auto-detects Vite and deploys

---

## 🔑 Passwords

| Role      | Password           | Purpose                              |
|-----------|--------------------|--------------------------------------|
| Candidate | `euro2025`         | Access code to enter the exam        |
| Admin     | `euroadmin@2025`   | View submissions & solutions         |

> **To change passwords**, edit `src/config.ts` and rebuild.

## ⚙️ Configuration

Edit `src/config.ts` to change:
- `CANDIDATE_PASSWORD` — access code for candidates
- `ADMIN_PASSWORD` — admin panel password
- `EXAM_DURATION_MINUTES` — exam time limit (default: 120 min)
- `QUESTIONS_PER_EXAM` — questions per exam (default: 15)

## 📝 How It Works

1. **Candidate visits the link** → sees landing page
2. **Enters access code** (`euro2025`) → goes to registration form
3. **Fills in details** (name, email, phone, university, etc.)
4. **Starts the exam** → 15 random questions, 2-hour timer
5. **Writes Java code** for each question
6. **Uses "Compile & Test"** to validate logic
7. **Submits exam** → answers are saved to localStorage
8. **Admin logs in** (`euroadmin@2025`) → reviews all submissions
9. **Admin can see** candidate code, reference solution, and explanations

## 💾 Data Storage

All data is stored in the browser's **localStorage**:
- Submissions persist across page refreshes
- Admin can export submissions as CSV
- To clear all data, clear browser localStorage

> For production use with multiple evaluators, consider adding a backend API.
