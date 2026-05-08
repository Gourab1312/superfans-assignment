export default function KpiCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">{title}</span>
      <span className="text-3xl font-bold text-slate-900 mt-1">{value}</span>
    </div>
  );
}