# Requirement Posting Flow

A 4-step requirement posting flow for event organisers to post a need to a **Planner**, **Performer**, or **Crew** — built with Next.js (frontend) and Express + MongoDB (backend).

```
requirement-posting-flow/
├── backend/     Express + MongoDB API
└── frontend/    Next.js (App Router) + TypeScript + Tailwind
```

## How it works

1. **Step 1 — Event Basics**: event name, type, single date or date range, location, optional venue, and a category selector (Planner / Performer / Crew).
2. **Steps 2 & 3 — Category-specific fields**: the questions change entirely based on the Step 1 selection.
   - **Planner** → services needed, budget, guest count, theme, experience level, notes.
   - **Performer** → performance type, genre, duration, headcount, sound/stage needs, equipment, soundcheck time.
   - **Crew** → crew type(s), headcount, shift times, dress code, experience level, languages, instructions.
3. **Step 4 — Review & Submit**: a summary of everything entered (with per-section "Edit" links back to the right step), then a single POST to the API.
4. On success, the app re-fetches the saved document from MongoDB by its `_id` and shows it — so you can prove in your recording that the data actually landed in the database, not just that a request was sent.

Data model: one `Requirement` collection in MongoDB with shared fields (`eventName`, `eventType`, `startDate`, `location`, `category`, …) plus **one** populated sub-document — `plannerDetails`, `performerDetails`, or `crewDetails` — matching the chosen `category`. The backend strips any sub-document that doesn't match the category before saving, so data is always cleanly categorised at the database level, not just in the UI.

## Design direction

Instead of a generic card-and-shadow form, the UI borrows from the paperwork that actually runs a live event — a **call sheet**: a dark "running order" rail on the left tracks the 4 steps, an amber "spotlight" accent marks the active step and primary actions, and section cards use hairline borders rather than soft drop shadows. Typography pairs Space Grotesk (headings) with IBM Plex Sans (body) and IBM Plex Mono for reference codes/timestamps.

## Prerequisites

- Node.js 18.18+ (Next.js 14 requirement)
- A MongoDB connection string — the easiest free option is [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- npm (or pnpm/yarn if you prefer — just adjust the commands below)

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/requirement-posting?retryWrites=true&w=majority
PORT=5000
CLIENT_ORIGIN=http://localhost:3000
```

Getting a `MONGODB_URI` from Atlas:
1. Create a free (M0) cluster.
2. **Database Access** → add a database user with a username/password.
3. **Network Access** → add `0.0.0.0/0` (allow access from anywhere) so it also works once deployed.
4. **Database** → **Connect** → **Drivers** → copy the connection string and swap in your username/password.

Run it:

```bash
npm run dev      # nodemon, restarts on changes
# or
npm start
```

You should see:

```
API listening on http://localhost:5000
MongoDB connected -> <your-cluster-host>/requirement-posting
```

Quick manual check:

```bash
curl http://localhost:5000/
# {"status":"ok","message":"Requirement Posting Flow API is running."}
```

### API reference

| Method | Route                     | Purpose                                  |
| ------ | ------------------------- | ----------------------------------------- |
| POST   | `/api/requirements`       | Create a requirement (Step 4 submit)      |
| GET    | `/api/requirements`       | List all requirements (`?category=` filter) |
| GET    | `/api/requirements/:id`   | Fetch one requirement by id               |

## 2. Frontend setup

In a second terminal:

```bash
cd frontend
npm install
cp .env.local.example .env.local
```

`.env.local` just needs to point at your backend:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Run it:

```bash
npm run dev
```

Open `http://localhost:3000` and walk through the flow. Pick a different category each time to see Steps 2 & 3 change.

## 3. Deploying

### Backend → Render (or Railway)

1. Push this repo to GitHub.
2. On [Render](https://render.com): **New → Web Service**, connect the repo, set **Root Directory** to `backend`.
3. Build command: `npm install`. Start command: `npm start`.
4. Add environment variables: `MONGODB_URI`, `PORT` (Render sets this automatically, but the app also reads `process.env.PORT`), and `CLIENT_ORIGIN` set to your Vercel URL once you have it.
5. Deploy, then copy the resulting `https://your-api.onrender.com` URL.

### Frontend → Vercel

1. On [Vercel](https://vercel.com): **New Project**, import the repo, set **Root Directory** to `frontend`.
2. Add an environment variable: `NEXT_PUBLIC_API_URL` = your Render backend URL from above.
3. Deploy.
4. Go back to Render and update `CLIENT_ORIGIN` to your new Vercel URL (e.g. `https://your-app.vercel.app`), so CORS allows it. Redeploy the backend.

## 4. What to cover in your screen recording (5–7 min)

A simple run-through that hits every point the assignment asks for:

1. **The form flow** (~2 min) — fill Step 1 for one category (e.g. Performer), show Steps 2 & 3 adapting to that category, then Review & Submit.
2. **Repeat briefly for a second category** (~1 min) — just Step 1 → Step 2, to show the fields genuinely change (e.g. switch to Crew and show shift times/crew type appear instead).
3. **API request/response** (~1–2 min) — open your browser's Network tab, submit a requirement, and show the `POST /api/requirements` request payload and the `201` response with the saved `_id`.
4. **MongoDB storage** (~1–2 min) — open MongoDB Atlas (or Compass/`mongosh`), navigate to the `requirements` collection, and show the newly created document with its category-specific sub-object populated. The app's own "View stored document" panel on the success screen is a fast way to show this on-screen too, right next to Atlas.

## Notes on scope

This intentionally stays close to what the assignment asks for — clean structure and working logic over production polish:
- No auth: this is a posting flow, not a marketplace with accounts.
- Client-side validation is per-step (required fields, date ordering); the backend re-validates required fields and category as a second line of defense.
- No file/image uploads, since none were requested.
