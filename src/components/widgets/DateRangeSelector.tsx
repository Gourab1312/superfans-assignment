export default function DateRangeSelector({ title, onEmit }: any) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-semibold text-slate-600 italic"> {title}</span>
      <div className="flex gap-2">
        <input
          type="date"
          className="border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onEmit({ start: e.target.value })}
        />
        <input
          type="date"
          className="border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onEmit({ end: e.target.value })}
        />
      </div>
    </div>
  );
}