import { useEffect, useState } from "react";
import api from "../api/api";
import PlatformConstraints from "./PlatformConstraints.jsx";

export default function PostForm({ onCreated }) {
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mode, setMode] = useState("now");
  const [scheduledAt, setScheduledAt] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    api.get("/platforms").then((res) => setPlatforms(res.data.platforms));
  }, []);

  // Build/clear a local preview URL whenever the selected file changes.
  useEffect(() => {
    if (!mediaFile) {
      setMediaPreview(null);
      return;
    }
    const url = URL.createObjectURL(mediaFile);
    setMediaPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [mediaFile]);

  function clearMedia(e) {
    e.stopPropagation();
    setMediaFile(null);
  }

  function togglePlatform(id) {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      setMediaFile(e.dataTransfer.files[0]);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Give your post a title before creating it.");
      return;
    }
    if (mode === "schedule" && !scheduledAt) {
      setError("Choose a date and time to schedule this post.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("platforms", JSON.stringify(selectedPlatforms));
    formData.append("mode", mode);
    if (mode === "schedule") formData.append("scheduledAt", scheduledAt);
    if (mediaFile) formData.append("media", mediaFile);

    setSubmitting(true);
    try {
      await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(
        mode === "schedule" ? "Post scheduled." : "Post published."
      );
      setTitle("");
      setDescription("");
      setMediaFile(null);
      setSelectedPlatforms([]);
      setScheduledAt("");
      setMode("now");
      onCreated?.();
    } catch (err) {
      setError(err.response?.data?.message || "Could not create post.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-[1.3fr,1fr] gap-6">
      <div className="card p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-extrabold text-slate-800">
            Create new post
          </h2>
          <span className="text-xs font-semibold bg-brand-50 text-brand-700 rounded-full px-3 py-1.5">
            Title &bull; Media &bull; Platforms &bull; Schedule
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Title*
            </label>
            <input
              className="input-field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's this post about?"
            />
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById("media-input").click()}
            className={`border-2 border-dashed rounded-2xl text-center cursor-pointer transition overflow-hidden ${
              mediaFile ? "p-3" : "py-12"
            } ${
              dragActive
                ? "border-brand-400 bg-brand-50"
                : "border-slate-200 bg-slate-50 hover:border-brand-300"
            }`}
          >
            {mediaFile ? (
              <div className="relative">
                {mediaFile.type.startsWith("video/") ? (
                  <video
                    src={mediaPreview}
                    controls
                    className="max-h-64 mx-auto rounded-xl"
                  />
                ) : (
                  <img
                    src={mediaPreview}
                    alt="Selected media preview"
                    className="max-h-64 mx-auto rounded-xl object-contain"
                  />
                )}
                <div className="flex items-center justify-between mt-3 px-1">
                  <p className="text-xs text-slate-500 truncate">{mediaFile.name}</p>
                  <button
                    type="button"
                    onClick={clearMedia}
                    className="text-xs font-semibold text-red-500 hover:text-red-600 shrink-0 ml-3"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="font-display font-bold text-slate-700">
                  Drag &amp; drop a file here
                </p>
                <p className="text-slate-400 text-sm mt-1">or click to browse</p>
              </>
            )}
            <input
              id="media-input"
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => setMediaFile(e.target.files?.[0] || null)}
            />
          </div>
          <p className="text-xs text-slate-400 -mt-3">
            Upload an image or video to attach to the post.
          </p>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description
            </label>
            <textarea
              className="input-field min-h-[120px] resize-y"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your caption..."
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setMode("now")}
              className={`rounded-xl px-5 py-2.5 font-semibold text-sm transition ${
                mode === "now"
                  ? "bg-brand-100 text-brand-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              Post now
            </button>
            <button
              type="button"
              onClick={() => setMode("schedule")}
              className={`rounded-xl px-5 py-2.5 font-semibold text-sm transition ${
                mode === "schedule"
                  ? "bg-brand-100 text-brand-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              Schedule
            </button>
          </div>

          {mode === "schedule" && (
            <input
              type="datetime-local"
              className="input-field"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
            />
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-brand-600">{success}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>

      <PlatformConstraints
        platforms={platforms}
        selected={selectedPlatforms}
        onToggle={togglePlatform}
      />
    </div>
  );
}