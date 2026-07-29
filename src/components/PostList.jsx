import { useState } from "react";
import api, { getMediaUrl } from "../api/api";
import PostModal from "./PostModal.jsx";

export default function PostList({ posts, onChanged, emptyLabel = "No posts yet." }) {
  const [editingId, setEditingId] = useState(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [viewingPost, setViewingPost] = useState(null);

  function startEdit(e, post) {
    e.stopPropagation();
    setEditingId(post.id);
    setDraftTitle(post.title);
  }

  async function saveEdit(e, id) {
    e.stopPropagation();
    await api.put(`/posts/${id}`, { title: draftTitle });
    setEditingId(null);
    onChanged?.();
  }

  async function handleDelete(e, id) {
    e.stopPropagation();
    await api.delete(`/posts/${id}`);
    onChanged?.();
  }

  if (!posts.length) {
    return <p className="text-slate-400 text-sm">{emptyLabel}</p>;
  }

  return (
    <>
      <ul className="space-y-3">
        {posts.map((post) => {
          const thumb = getMediaUrl(post.mediaUrl);
          const isVideo = post.mediaUrl && /\.(mp4|mov|webm)$/i.test(post.mediaUrl);

          return (
            <li
              key={post.id}
              onClick={() => setViewingPost(post)}
              className="flex items-center gap-4 border border-slate-100 rounded-xl px-4 py-3 cursor-pointer hover:border-brand-200 hover:bg-brand-50/40 transition"
            >
              {thumb ? (
                isVideo ? (
                  <video src={thumb} className="w-14 h-14 rounded-lg object-cover shrink-0 bg-slate-100" />
                ) : (
                  <img
                    src={thumb}
                    alt={post.title}
                    className="w-14 h-14 rounded-lg object-cover shrink-0 bg-slate-100"
                  />
                )
              ) : (
                <div className="w-14 h-14 rounded-lg bg-slate-100 shrink-0" />
              )}

              <div className="min-w-0 flex-1">
                {editingId === post.id ? (
                  <input
                    className="input-field py-1.5"
                    value={draftTitle}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setDraftTitle(e.target.value)}
                  />
                ) : (
                  <p className="font-semibold text-slate-800 truncate">{post.title}</p>
                )}
                <p className="text-xs text-slate-400 mt-1">
                  {post.platforms?.join(", ") || "No platforms selected"} &bull;{" "}
                  {post.status === "scheduled"
                    ? `Scheduled for ${new Date(post.scheduledAt).toLocaleString()}`
                    : `Published ${new Date(post.createdAt).toLocaleString()}`}
                </p>
              </div>

              <div className="flex gap-2 shrink-0">
                {editingId === post.id ? (
                  <button
                    onClick={(e) => saveEdit(e, post.id)}
                    className="text-xs font-semibold text-brand-600 hover:underline"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={(e) => startEdit(e, post)}
                    className="text-xs font-semibold text-slate-500 hover:text-brand-600"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={(e) => handleDelete(e, post.id)}
                  className="text-xs font-semibold text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <PostModal post={viewingPost} onClose={() => setViewingPost(null)} />
    </>
  );
}