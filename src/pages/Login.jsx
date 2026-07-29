import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const HIGHLIGHTS = [
  "Coordinate every post from one central workspace",
  "Stay ahead of deadlines with a clear schedule view",
  "Keep your publishing flow organized and consistent",
];

export default function Login() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password);
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-xl">
        <div className="bg-gradient-to-br from-brand-800 via-brand-600 to-accent-500 p-10 text-white flex flex-col justify-center">
          <span className="self-start bg-white/15 text-xs font-bold tracking-wide uppercase rounded-full px-4 py-1.5 mb-6">
            Social Media Workspace
          </span>
          <h1 className="text-4xl font-display font-extrabold leading-tight mb-4">
            Plan smarter posts and publish without friction.
          </h1>
          <p className="text-white/85 mb-8">
            Create your next campaign, schedule it across channels, and keep
            your content flowing from one focused dashboard.
          </p>
          <div className="space-y-3">
            {HIGHLIGHTS.map((h) => (
              <div key={h} className="bg-white/15 rounded-xl px-4 py-3 text-sm">
                {h}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-10 flex flex-col justify-center">
          <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-2">
            {mode === "login" ? "Welcome back" : "Get started"}
          </p>
          <h2 className="text-2xl font-display font-extrabold text-slate-800 mb-2">
            {mode === "login" ? "Sign in to your studio" : "Create your studio"}
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Access your post planner and manage your next launch.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button type="submit" disabled={submitting} className="btn-primary w-full">
              {submitting
                ? "Please wait..."
                : mode === "login"
                ? "Sign In"
                : "Create account"}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm">
            <button className="text-brand-600 font-semibold hover:underline">
              Forgot password?
            </button>
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-brand-600 font-semibold hover:underline"
            >
              {mode === "login" ? "Create an account" : "Sign in instead"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
