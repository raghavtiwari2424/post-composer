import { useCallback, useEffect, useState } from "react";
import api from "../api/api";
import StatsCard from "../components/StatsCard.jsx";
import PostForm from "../components/PostForm.jsx";
import PostList from "../components/PostList.jsx";

const WORKFLOW_ITEMS = [
  "Draft your next message",
  "Review platform requirements",
  "Confirm today's schedule",
];

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, scheduled: 0, published: 0 });
  const [posts, setPosts] = useState([]);

  const refresh = useCallback(async () => {
    const [statsRes, postsRes] = await Promise.all([
      api.get("/posts/stats"),
      api.get("/posts"),
    ]);
    setStats(statsRes.data.stats);
    setPosts(postsRes.data.posts);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const scheduledPosts = posts.filter((p) => p.status === "scheduled");
  const recentPosts = posts.slice(0, 5);

  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-br from-brand-800 via-brand-600 to-accent-500 rounded-3xl p-10 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="max-w-xl">
          <span className="text-xs font-bold tracking-widest uppercase text-white/70">
            Social Media Studio
          </span>
          <h1 className="text-4xl font-display font-extrabold mt-3 mb-4 leading-tight">
            Create, manage, and schedule your posts in one place.
          </h1>
          <p className="text-white/85">
            Publish to Facebook, Instagram, X, Reddit, Quora, or Pinterest
            while keeping your content calendar organized and your workflow
            effortless.
          </p>
        </div>
        <div className="flex gap-4">
          <StatsCard value={stats.total} label="Total posts" />
          <StatsCard value={stats.scheduled} label="Scheduled" />
        </div>
      </section>

      <div className="grid lg:grid-cols-[280px,1fr] gap-6 items-start">
        <div className="card p-6">
          <h3 className="font-display font-bold text-slate-800 mb-4">
            Today&rsquo;s workflow
          </h3>
          <div className="space-y-3">
            {WORKFLOW_ITEMS.map((item) => (
              <div
                key={item}
                className="bg-brand-50 text-brand-700 font-semibold text-sm rounded-xl px-4 py-3"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <PostForm onCreated={refresh} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-slate-800">Recent posts</h3>
            <span className="text-xs font-semibold bg-brand-50 text-brand-700 rounded-full px-3 py-1">
              Edit &amp; delete
            </span>
          </div>
          <PostList posts={recentPosts} onChanged={refresh} />
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-slate-800">
              Scheduled overview
            </h3>
            <span className="text-xs font-semibold bg-brand-50 text-brand-700 rounded-full px-3 py-1">
              Timeline
            </span>
          </div>
          <p className="font-display font-bold text-slate-700 mb-2">
            Post Schedule
          </p>
          <PostList
            posts={scheduledPosts}
            onChanged={refresh}
            emptyLabel="No scheduled posts yet."
          />
        </div>
      </div>
    </div>
  );
}
