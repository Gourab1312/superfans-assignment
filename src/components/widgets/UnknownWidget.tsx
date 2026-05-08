import { AlertCircle } from 'lucide-react';

export default function UnknownWidget({ type }: { type: string }) {
  return (
    <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-4 rounded-lg border border-amber-200">
      <AlertCircle size={20} />
      <span className="text-sm font-medium">Unknown Widget: <strong>{type}</strong></span>
    </div>
  );
}