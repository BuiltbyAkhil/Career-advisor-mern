# Career Advisor AI — MERN Stack

A full rebuild of the Career Advisor AI project using **only** the MERN stack
(MongoDB, Express, React, Node) plus Bootstrap 5 for styling. No Tailwind,
no Three.js, no vanilla-JS DOM scripts.

## What changed from the original

- **Frontend**: rewritten from vanilla JS + Tailwind + Three.js into a
  React (Vite) single-page app using React Router and Bootstrap 5. The 3D
  Three.js roadmap/career-tree scenes were replaced with 2D Bootstrap
  card/timeline layouts (same data, simpler and more reliable to run).
- **Backend**: kept — it was already Express + Mongoose. Fixed bugs found
  along the way:
  - `MONGODB_URI` vs `MONGO_URI` mismatch between `config/db.js` and `.env.example`.
  - `package.json` listed `openai`, `stripe`, `razorpay`, `three`, `@tweenjs/tween.js`
    as dependencies, but the code actually used `groq-sdk` (missing from
    `package.json`) for AI features, and only referenced Stripe/Razorpay in one route.
  - Removed the three.js/tween.js static file routes in `server.js` (no longer needed
    since the frontend has no 3D scene).
  - `server.js` now serves the built React app (`frontend/dist`) instead of the old
    static `frontend/` folder.
- **Payments**: the original Stripe/Razorpay integration required external API keys
  and services outside the MERN stack, so it's replaced with a simple mock
  `/api/payments/subscribe` endpoint that activates a subscription directly in
  MongoDB. Swap in real Stripe/Razorpay calls later if you need real payments.

## Project structure

```
career-advisor-mern/
├── backend/            # Express + Mongoose API
│   ├── config/         # DB connection
│   ├── middleware/      # auth + subscription guards
│   ├── models/          # Mongoose schemas
│   ├── routes/           # API routes
│   ├── services/         # Groq AI service (quiz/roadmap/chat generation)
│   ├── seed.js           # seeds sample colleges
│   └── server.js
└── frontend/            # React (Vite) + Bootstrap 5 SPA
    └── src/
        ├── api/          # fetch wrapper w/ JWT auth
        ├── context/      # AuthContext
        ├── components/   # Navbar, ProtectedRoute
        ├── pages/        # one component per route
        └── styles/       # theme.css (dark neon glass UI, converted from the original CSS)
```

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# then edit .env and fill in:
#   MONGO_URI=<your MongoDB connection string>
#   JWT_SECRET=<any random string>
#   GROQ_API_KEY=<your Groq API key, from console.groq.com — free tier available>
npm run seed     # optional: populates sample colleges
npm run dev      # starts on http://localhost:5001
```

### 2. Frontend (development)

```bash
cd frontend
npm install
npm run dev      # starts on http://localhost:5173, proxies /api to :5001
```

Open http://localhost:5173 in your browser.

### 3. Production build

```bash
cd frontend
npm run build     # outputs to frontend/dist

cd ../backend
npm start          # serves both the API and the built frontend on :5001
```

Then open http://localhost:5001.

## Notes

- AI features (quiz generation, roadmap generation, chat) use **Groq**
  (`llama-3.3-70b-versatile`) via the `groq-sdk` package — get a free API key at
  https://console.groq.com. These endpoints will error until `GROQ_API_KEY` is set.
- The subscription/payment flow is a **mock** — clicking "Activate Pro Tier" instantly
  creates an active subscription in the database. No real money changes hands and no
  external payment provider keys are required.
