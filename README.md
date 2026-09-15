# Astra — Your Daily Horoscope

A small web app where you enter your date, time, and place of birth once, then
get a fresh personalized daily horoscope at the click of a button.

## What it does

- Collects your **date of birth**, **time of birth** (optional, can be marked
  "unknown"), and **place of birth**.
- Computes your western sun sign from your birth date.
- Generates a personalized daily reading (headline, narrative, love, career,
  wellness, mood, lucky number, and lucky color) tailored to your sign and
  birth details.
- Saves your birth profile in your browser's `localStorage` — nothing is sent
  to a database, and you can edit or clear it any time via the pencil icon.
- Caches each day's reading locally so reloading the page doesn't burn API
  calls or produce a different reading; a "New reading" button lets you
  explicitly ask for a fresh take.

## How the horoscope is generated

Horoscope text is produced by `src/lib/horoscope.ts`:

- **With an `OPENAI_API_KEY` configured**, it calls the OpenAI Chat
  Completions API with a system prompt describing a warm, specific
  astrologer persona ("Astra"), asking for strict JSON output, and grounds
  the reading in the user's sun sign, birth date/time, and location.
- **Without an API key** (the default out of the box), it falls back to a
  local deterministic generator (`src/lib/horoscopeTemplates.ts` +
  `src/lib/seededRandom.ts`) that mixes curated phrase banks using a seed
  derived from the birth profile and the current date, so the app is fully
  usable with zero configuration and still feels personalized and
  day-to-day consistent.

This means you can try the whole product experience immediately, and layer
in real AI generation by adding a secret.

## Enabling AI-generated readings

1. Copy `.env.example` to `.env.local`.
2. Set `OPENAI_API_KEY` to a valid OpenAI API key.
3. (Optional) set `OPENAI_MODEL` to override the default (`gpt-4o-mini`).
4. Restart the dev server.

If you're running this as a Cursor Cloud Agent, add `OPENAI_API_KEY` as a
secret in the Cursor Dashboard (Cloud Agents → Secrets) instead of a local
`.env.local` file.

## Getting started

```bash
npm install
npm run dev
```

The app runs at [http://localhost:4287](http://localhost:4287).

## Project structure

```
src/
  app/
    api/horoscope/route.ts   # POST endpoint: birth profile -> horoscope
    page.tsx                 # Home page: birth form or horoscope view
    layout.tsx               # Root layout, cosmic theme, starfield
  components/
    birth-form.tsx           # Collects date/time/location of birth
    horoscope-view.tsx       # Displays sign + daily reading, fetch logic
    starfield.tsx            # Decorative animated star background
    ui/                      # shadcn/ui primitives
  lib/
    zodiac.ts                # Sun sign calculation + metadata
    horoscope.ts             # OpenAI call + fallback generator + types
    horoscopeTemplates.ts    # Phrase banks for the local fallback generator
    seededRandom.ts          # Deterministic PRNG seeded by profile + date
    storage.ts                # localStorage persistence for the birth profile
```

## Notes & limitations

- The app computes a **sun sign** only. Rising sign and moon sign require a
  real ephemeris and timezone-aware calculations from lat/long, which is out
  of scope for this first version — birth time and location are still
  collected and passed into the AI prompt so the reading can reference them
  narratively.
- This is for entertainment purposes; no astronomical or astrological claims
  are guaranteed to be accurate.

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) components
- [OpenAI SDK](https://github.com/openai/openai-node) for optional AI-generated readings
