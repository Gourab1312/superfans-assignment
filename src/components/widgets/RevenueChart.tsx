import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';

// Helper to format date to dd/mm/yy
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  }).format(date);
};

// Helper to generate mock revenue based on a date range
const generateDataForRange = (startStr?: string, endStr?: string) => {
  const start = startStr ? new Date(startStr) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const end = endStr ? new Date(endStr) : new Date();

  const data = [];
  let current = new Date(start);

  while (current <= end) {
    data.push({
      dateStr: formatDate(new Date(current)),
      revenue: Math.floor(Math.random() * 5000) + 1000,
    });
    current.setDate(current.getDate() + 1);
    if (data.length > 31) break; // Safety cap
  }
  return data;
};

export default function RevenueChart({ title, subscribedData }: any) {
  const dateFilter = subscribedData['w_date_1'];

  // This is the "Reactive" part. When dateFilter changes, useMemo recalculates data.
  const chartData = useMemo(() => {
    return generateDataForRange(dateFilter?.start, dateFilter?.end);
  }, [dateFilter?.start, dateFilter?.end]);

  return (
    <div className="h-[350px] flex flex-col">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <p className="text-xs text-slate-500">Daily revenue breakdown</p>
        </div>
        {dateFilter?.start && (
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Active Filter</span>
            <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">
              {formatDate(new Date(dateFilter.start))} — {dateFilter.end ? formatDate(new Date(dateFilter.end)) : 'Today'}
            </span>
          </div>
        )}
      </div>

      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="dateStr"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              minTickGap={20}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              tickFormatter={(val) => `₹${val / 1000}k`}
            />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
              formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, "Revenue"]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorRev)"
              strokeWidth={3}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}