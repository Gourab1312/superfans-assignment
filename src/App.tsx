import { useEffect, useState } from 'react';
import { DashboardProvider } from './components/engine/DashboardProvider';
import { DashboardRenderer } from './components/engine/DashboardRenderer';
import { fetchDashboardConfig } from './api/dashboardApi';
import type { DashboardSchema } from './types/dashboard';

// 1. Helper to get default dates (7 days ago to Today)
const getInitialDates = () => {
  const today = new Date().toISOString().split('T')[0];
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  return { start: sevenDaysAgo, end: today };
};

function App() {
  const [config, setConfig] = useState<DashboardSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardConfig()
      .then((data) => {
        setConfig(data);
      })
      .catch((err) => {
        console.error("Failed to load dashboard:", err);
        setError("Could not load dashboard configuration.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-50 font-sans">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-slate-500 font-medium animate-pulse">Loading Engine...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex h-screen w-screen items-center justify-center bg-red-50 text-red-600 font-medium">
      {error}
    </div>
  );

  return (
    /* 2. Pass initial state to hydrate the context for w_date_1 */
    <DashboardProvider
      initialValues={{ "w_date_1": getInitialDates() }}
    >
      <div className="min-h-screen bg-[#f8fafc] py-10 font-sans">
        <header className="max-w-7xl mx-auto px-6 mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {config?.meta.title}
            </h1>
            <p className="text-slate-500 text-sm mt-1">Config-driven Analytics Engine</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Status: </span>
            <span className="text-xs font-bold text-green-500 uppercase">Live</span>
          </div>
        </header>

        {config && (
          <main className="transition-opacity duration-500 ease-in">
            <DashboardRenderer config={config} />
          </main>
        )}
      </div>
    </DashboardProvider>
  );
}

export default App;