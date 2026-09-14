# Alive Inside Caregiver

Mobile-first web app for family caregivers of elders with dementia. Warm Alive Inside branding, a practical Dementia Coach, Music Detective playlists, and a Healing Headset / Memory Player loading checklist.

## Stack

- Vite + React + TypeScript
- React Router (client-side)
- Works fully offline for coaching (rule-based). Optional OpenAI if `VITE_OPENAI_API_KEY` is set.

## Quick start

```bash
cd /workspace/alive-inside-caregiver
npm install
npm run dev -- --host 0.0.0.0 --port 5173
```

Open **http://localhost:5173** (or your machine’s IP on port 5173).

## Build

```bash
npm run build
npm run preview -- --host 0.0.0.0 --port 4173
```

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — branding & CTAs |
| `/coach` | Dementia Coach chat (local templates + optional OpenAI) |
| `/music` | Music Detective interview → playlist + Spotify search links |
| `/headset` | Load Headset checklist & resources |

## Optional OpenAI

Create a `.env` file (never commit secrets):

```
VITE_OPENAI_API_KEY=sk-...
```

Without a key, the coach uses rich local Alive Inside–aligned responses.

## Content & practices

See [CONTENT.md](./CONTENT.md) for cited Alive Inside / Healing Headset practices used in the app.

## Contact

- https://aliveinside.org
- info@aliveinside.org
