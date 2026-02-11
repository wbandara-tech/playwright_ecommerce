# CI Workflows

This folder contains the GitHub Actions workflow definitions for this project.

## Activating the Workflow

To enable GitHub Actions, copy the workflow file to `.github/workflows/`:

```bash
mkdir -p .github/workflows
cp ci-workflows/playwright-ci.yml .github/workflows/playwright-ci.yml
git add .github/workflows/playwright-ci.yml
git commit -m "ci: activate GitHub Actions workflow"
git push
```

Or create the file directly in the GitHub UI:
1. Go to **Actions** tab in the repository
2. Click **New workflow** → **set up a workflow yourself**
3. Paste the contents of `ci-workflows/playwright-ci.yml`
4. Save and commit

## Workflow Overview

### `playwright-ci.yml`
- **Lint & Type Check** — Runs `tsc --noEmit`
- **Playwright Tests** — Matrix build across browsers (chromium/firefox/webkit)
- **Smoke Tests** — Runs `@smoke` tagged tests on push to main/master
- **Publish Report** — Deploys Playwright HTML report to GitHub Pages

### Required Secrets
| Secret | Description |
|--------|-------------|
| `BASE_URL` | Target site URL (defaults to `https://automationexercise.com`) |
| `TEST_USER_EMAIL` | Test user email |
| `TEST_USER_PASSWORD` | Test user password |
| `TEST_USER_NAME` | Test user display name |

### GitHub Pages Setup
1. Go to **Settings** → **Pages**
2. Set **Source** to **GitHub Actions**
3. The Playwright HTML report will be published after each test run
