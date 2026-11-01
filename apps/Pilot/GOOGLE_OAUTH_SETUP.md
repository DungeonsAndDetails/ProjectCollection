# Google OAuth Setup

How to get the credentials Pilot's "Sign in with Google" needs. This is a one-time, external Google Cloud Console setup — nothing here is code, and only you can do it (it's tied to your Google account).

Current scope: **sign-in only** — verifying who a user is (name, email, profile picture) via Google Identity Services' ID-token flow. No Gmail data access, no client secret, no refresh tokens. See "Migrating to full OAuth" at the bottom for what changes when that's needed later.

## 1. Create a Google Cloud project

1. Go to [console.cloud.google.com](https://console.cloud.google.com/) and sign in with the Google account you want to own this.
2. Top-left project dropdown → **New Project**.
3. Name it something recognizable (e.g. `projectcollection-pilot`). Organization/location can stay default.
4. Create, then make sure the new project is selected in the dropdown before continuing.

## 2. Configure the OAuth consent screen

1. Left sidebar → **APIs & Services** → **OAuth consent screen**.
2. User type: **External** (unless you have a Google Workspace org you want to restrict this to — External is right for a personal Google account).
3. Fill in the required fields: app name (e.g. "ProjectCollection Pilot"), your email as user support email, your email again as developer contact.
4. Scopes step: leave as-is. The default `openid`, `email`, `profile` scopes (non-sensitive) are all sign-in needs — don't add anything else here yet.
5. Test users step: add your own Google account email (and anyone else who should be able to sign in while the app is unpublished). While the app is in **Testing** publishing status, only listed test users can sign in — that's fine and expected for this stage.
6. Save through to the summary. Leave publishing status as **Testing** — publishing to production requires Google's verification review, which only matters once real users beyond your test list need access.

## 3. Create the OAuth Client ID

1. Left sidebar → **APIs & Services** → **Credentials**.
2. **Create Credentials** → **OAuth client ID**.
3. Application type: **Web application**.
4. Name: e.g. `pilot-frontend-dev`.
5. **Authorized JavaScript origins** → add `http://localhost:5173` (Pilot's frontend dev port).
6. **Authorized redirect URIs**: leave empty. The ID-token flow used here doesn't redirect back to a URI — this field only matters for the full authorization-code flow (see below).
7. Create. Copy the **Client ID** it shows you (looks like `123456789-abc...xyz.apps.googleusercontent.com`). You won't need the auto-generated client secret for this stage.

## 4. Wire the Client ID into the repo

The same Client ID goes in two places — it's not a secret (it's sent to the browser either way), but it still lives in each app's own `.env`, not committed:

- `apps/Pilot/backend/.env` → `GOOGLE_CLIENT_ID=<paste it>`
- `apps/Pilot/frontend/.env` → `VITE_GOOGLE_CLIENT_ID=<paste it>` (create this file from `apps/Pilot/frontend/.env.example` if it doesn't exist yet)

Both values must match exactly — the backend uses it to validate the token's audience, the frontend uses it to initialize Google's sign-in button.

Restart both dev servers after editing either `.env` file.

## Migrating to full OAuth (Gmail API access), later

When there's an actual feature that needs to call Gmail's API on a user's behalf (not just know who they are), this setup needs to grow:

- Add a **client secret** (already generated alongside the Client ID above, just unused for now) — the backend will need it to exchange an authorization code for access/refresh tokens.
- Add the specific Gmail scopes the feature needs (e.g. `gmail.readonly`) on the OAuth consent screen — these are "sensitive" or "restricted" scopes depending which, and pull the app into Google's verification review before it can leave Testing status with real users.
- Switch the frontend from the ID-token flow to Google's authorization-code flow (`ux_mode: 'redirect'` or a server-driven redirect), since offline/refresh access requires a real redirect round-trip, not just a signed ID token.
- Store refresh tokens server-side (`User` model gains a token field), encrypted at rest.

None of that is needed for sign-in — it's flagged here so the jump doesn't look like starting over.
