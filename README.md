# Post Composer — Social Media Workspace

A full-stack post composer/scheduler: create posts, attach media, pick target
platforms (each with its own character/hashtag limits), and either publish
immediately or schedule for later. Built with a React (Vite + Tailwind)
frontend and a Node/Express backend.

Color theme: teal → sky blue (swapped from the original purple/violet mock).

## Project structure

```
FSD-2/
│
├── backend/                 # Express API
│   ├── api/                 # Vercel serverless entry point
│   ├── config/              # DB (JSON file) + platform constraints config
│   ├── controllers/         # Request handlers
│   ├── middleware/           # Auth (JWT) + file upload (multer)
│   ├── models/               # Data shape helpers (Post, User)
│   ├── routes/               # Express routers
│   ├── services/             # Business logic
│   ├── data/                 # db.json is generated here at runtime
│   ├── uploads/              # Uploaded media files
│   ├── server.js
│   └── vercel.json
│
├── src/                      # React frontend
│   ├── api/                  # Axios client
│   ├── components/           # Navbar, PostForm, PostList, etc.
│   ├── context/               # Auth context
│   ├── pages/                 # Login, Dashboard, Schedule, Posts
│   └── App.jsx
│
├── public/
├── package.json               # Frontend package.json (root)
├── vite.config.js
├── tailwind.config.js
├── vercel.json                 # Frontend Vercel config
└── README.md
```

## Running locally

### 1. Backend

```bash
cd backend
cp .env.example .env      # edit JWT_SECRET, CLIENT_ORIGIN if needed
npm install
npm run dev                # nodemon, http://localhost:5000
```

The backend stores data in `backend/data/db.json` (created automatically —
no external database required) and uploaded media in `backend/uploads/`.

### 2. Frontend

```bash
# from the project root
cp .env.example .env       # set VITE_API_URL if backend isn't on localhost:5000
npm install
npm run dev                 # http://localhost:5173
```

Open `http://localhost:5173`, create an account, and start composing posts.

## Pushing to GitHub

```bash
cd FSD-2
git init
git add .
git commit -m "Initial commit: post composer app"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## Deploying

### Frontend → Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repo.
2. Framework preset: **Vite**. Build command `npm run build`, output directory `dist` (already set in `vercel.json`).
3. Add an environment variable `VITE_API_URL` pointing at your deployed backend URL (see below).
4. Deploy. Vercel will give you a live URL for the frontend.

### Backend → Vercel (or Render/Railway)

The repo includes `backend/vercel.json` so you *can* deploy the backend to
Vercel as its own project (import the repo again, but set the **root
directory** to `backend` in the Vercel project settings).

**Important caveat:** Vercel serverless functions have a read-only,
ephemeral filesystem. That means:
- The JSON-file datastore (`backend/data/db.json`) will reset on every cold
  start/deploy — accounts and posts won't persist reliably.
- Uploaded media saved via `multer` to `backend/uploads/` will not persist
  either.

This is fine for a demo, but for real persistence you have two options:
1. **Easiest fix, same architecture:** deploy the backend to a host with a
   persistent filesystem instead, such as **Render** or **Railway** (both
   have free tiers and run `npm start` against `backend/server.js` directly,
   no code changes needed).
2. **Production-grade fix:** swap the JSON-file store in
   `backend/config/db.js` for a real database (e.g. MongoDB Atlas or
   Postgres/Supabase) and swap local disk uploads for object storage (e.g.
   Cloudinary or S3). The rest of the app (controllers/services/routes)
   won't need to change — only `config/db.js` and `middleware/upload.js`.

Whichever host you pick for the backend, set the frontend's `VITE_API_URL`
environment variable to that backend's URL, and set the backend's
`CLIENT_ORIGIN` environment variable to your frontend's deployed URL (for
CORS).

## API overview

| Method | Route                | Description                          |
|--------|-----------------------|--------------------------------------|
| POST   | `/api/auth/register`  | Create an account                    |
| POST   | `/api/auth/login`     | Log in, returns a JWT                |
| GET    | `/api/platforms`      | Platform posting rules (X, Instagram, etc.) |
| GET    | `/api/posts`          | List your posts (auth required)      |
| GET    | `/api/posts/stats`    | Total/scheduled/published counts     |
| POST   | `/api/posts`          | Create a post (multipart, supports `media` file) |
| PUT    | `/api/posts/:id`      | Update a post                        |
| DELETE | `/api/posts/:id`      | Delete a post                        |
