# Website Screenshot App

A frontend-first web app that captures website screenshots, previews them, and lets users save and manage screenshots.

The app uses Vercel serverless functions as a lightweight backend layer so API keys stay private while the project remains simple.

## Features

- Capture screenshot from a user-provided website URL.
- Preview the latest captured screenshot.
- Save screenshots to persistent storage (CrudCrud).
- Load saved screenshots on page load.
- Delete saved screenshots.
- Graceful error handling for API failures, invalid responses, and missing configuration.
- Request cooldown, caching, and fallback behavior for rate limits/quota issues.

## Tech Stack

- Frontend: HTML, CSS, Vanilla JavaScript
- Serverless API: Vercel Functions (`api/`)
- Screenshot provider: RapidAPI (`website-screenshot6.p.rapidapi.com`)
- Storage: CrudCrud REST API

## Project Structure

- Frontend app: `assets/courses/frontend/advanced-javascript/week4/`
- Serverless routes: `api/`
- Vercel routing config: `vercel.json`

## Environment Variables

Set these in Vercel Project Settings (and optionally locally for testing):

- `RAPIDAPI_KEY`
- `RAPIDAPI_HOST` (example: `website-screenshot6.p.rapidapi.com`)
- `CRUDCRUD_API_URL` (example: `https://crudcrud.com/api/<token>/screenshots`)

## Local Development

1. Open terminal at project root.
2. Run:

```bash
vercel dev
```

3. Open the local URL shown by Vercel.
4. Test the flow:

- Capture screenshot
- Save screenshot
- Reload page and confirm saved list
- Delete a saved screenshot

## Deployment (GitHub + Vercel)

1. Push your branch to GitHub.
2. Open PR and merge to main.
3. Vercel auto-deploys from the connected repository.
4. Verify in production:

- Screenshot capture works
- Saved list loads correctly
- Delete works
- No secret keys appear in browser code/network requests

## Why Vercel Functions Were Needed

This is mainly a frontend project, but third-party APIs require secret keys.
Calling those APIs directly from the browser would expose credentials.
Vercel serverless routes provide a minimal backend layer to keep secrets secure without building a full backend service.

## Known Limitations

- CrudCrud endpoints can expire and must be replaced with a new URL/token.
- RapidAPI usage is limited by plan quotas and rate limits.

## Maintenance Notes

- Rotate API keys if they are ever exposed.
- Keep environment variables set for all Vercel environments:
  - development
  - preview
  - production
- Keep all third-party API calls inside serverless routes (`api/`) to avoid leaking secrets.
