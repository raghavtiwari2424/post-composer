import { getMediaUrl } from "../api/api";

export default function PostModal({ post, onClose }) {
  if (!post) return null;

  const mediaUrl = getMediaUrl(post.mediaUrl);
  const isVideo = post.mediaUrl && /\.(mp4|mov|webm)$/i.test(post.mediaUrl);

  return (
    <div
      className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-6 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {mediaUrl && (
          <div className="bg-slate-100">
            {isVideo ? (
              <video src={mediaUrl} controls className="w-full max-h-80 object-contain" />
            ) : (
              <img
                src={mediaUrl}
                alt={post.title}
                className="w-full max-h-80 object-contain"
              />
            )}
          </div>
        )}

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-display font-extrabold text-slate-800">
              {post.title}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 text-xl leading-none shrink-0"
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          <p className="text-xs text-slate-400 mt-2">
            {post.status === "scheduled"
              ? `Scheduled for ${new Date(post.scheduledAt).toLocaleString()}`
              : `Published ${new Date(post.createdAt).toLocaleString()}`}
          </p>

          {post.description && (
            <p className="text-slate-600 text-sm mt-4 whitespace-pre-wrap">
              {post.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-4">
            {post.platforms?.length ? (
              post.platforms.map((p) => (
                <span
                  key={p}
                  className="text-xs font-semibold bg-brand-50 text-brand-700 rounded-full px-3 py-1 capitalize"
                >
                  {p}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400">No platforms selected</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}