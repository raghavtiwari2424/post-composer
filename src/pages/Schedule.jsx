import { useCallback, useEffect, useState } from "react";
import api from "../api/api";

export default function Schedule() {
  const [posts, setPosts] = useState([]);

  const refresh = useCallback(async () => {
    const res = await api.get("/posts");
    setPosts(
      res.data.posts
        .filter((p) => p.status === "scheduled")
        .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt))
    );
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-display font-extrabold text-slate-800">
        Schedule
      </h1>

      <div className="card p-6">
        {posts.length === 0 ? (
          <p className="text-slate-400 text-sm">
            Nothing scheduled yet. Create a post from the Dashboard and choose
            &ldquo;Schedule&rdquo; to see it appear here.
          </p>
        ) : (
          <ol className="relative border-l-2 border-brand-100 ml-3 space-y-8">
            {posts.map((post) => (
              <li key={post.id} className="ml-6">
                <span className="absolute -translate-x-1/2 w-3 h-3 bg-brand-500 rounded-full mt-1.5" />
                <p className="text-xs font-semibold text-brand-600">
                  {new Date(post.scheduledAt).toLocaleString()}
                </p>
                <p className="font-display font-bold text-slate-800 mt-1">
                  {post.title}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {post.platforms?.join(", ") || "No platforms selected"}
                </p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
