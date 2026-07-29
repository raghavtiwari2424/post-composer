export default function StatsCard({ value, label }) {
  return (
    <div className="bg-white/15 rounded-2xl px-6 py-5 min-w-[150px]">
      <p className="text-3xl font-display font-extrabold text-white">{value}</p>
      <p className="text-white/80 text-sm mt-1">{label}</p>
    </div>
  );
}
