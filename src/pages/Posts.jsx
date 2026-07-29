import { useCallback, useEffect, useState } from "react";
import api from "../api/api";
import PostList from "../components/PostList.jsx";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("all");

  const refresh = useCallback(async () => {
    const res = await api.get("/posts");
    setPosts(res.data.posts);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const filtered = posts.filter((p) => {
    if (filter === "all") return true;
    return p.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-extrabold text-slate-800">
          All posts
        </h1>
        <div className="flex gap-2">
          {["all", "published", "scheduled"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-sm font-semibold rounded-xl px-4 py-2 capitalize transition ${
                filter === f
                  ? "bg-brand-100 text-brand-700"
                  : "bg-white text-slate-500 border border-slate-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <PostList posts={filtered} onChanged={refresh} emptyLabel="No posts match this filter." />
      </div>
    </div>
  );
}
