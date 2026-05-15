import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

// Defining a clear interface for the internal state
type DashboardState = Record<string, any>;

interface DashboardContextType {
  widgetStates: DashboardState;
  // Using a functional update pattern similar to React's useState for flexibility
  setWidgetState: (id: string, value: any) => void;
  error: string | null;
  setError: (val: string) => void
}

const DashboardContext = createContext<DashboardContextType | null>(null);

interface ProviderProps {
  children: React.ReactNode;
  // This helps in hydrating the defaults in App.tsx
  initialValues?: DashboardState;
}

export const DashboardProvider: React.FC<ProviderProps> = ({
  children,
  initialValues = {}
}) => {
  // Initializing the state with hydration data
  const [widgetStates, setWidgetStates] = useState<DashboardState>(initialValues);
  const [error, setError] = useState(null);

  /**
   * Updating a specific widget's state.
   * We use a shallow merge for the specific widget ID so that if you update 
   * the 'start' date, it doesn't delete the 'end' date.
   */
  const setWidgetState = useCallback((id: string, value: any) => {
    console.log('widgetState', widgetStates);
    if (id === 'w_date_1') {
      let startDate = widgetStates[id].start;
      let endDate = widgetStates[id].end;

      endDate >= startDate && setError('endDate is greater than startDate');
      return;
    }
    setWidgetStates((prev) => {
      const currentWidgetState = prev[id] || {};

      // If the value is the same, return the previous state to avoid unnecessary re-renders
      if (currentWidgetState === value) return prev;

      return {
        ...prev,
        [id]: {
          ...currentWidgetState,
          ...(typeof value === 'object' && value !== null ? value : { value })
        }
      };
    });
  }, []);

  const contextValue = useMemo(() => ({
    widgetStates,
    setWidgetState,
    error,
    setError
  }), [widgetStates, setWidgetState, error, setError]);

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return ctx;
};