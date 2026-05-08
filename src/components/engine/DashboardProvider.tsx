import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

// Define a clear interface for the internal state
type DashboardState = Record<string, any>;

interface DashboardContextType {
  widgetStates: DashboardState;
  // Using a functional update pattern similar to React's setState for flexibility
  setWidgetState: (id: string, value: any) => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

interface ProviderProps {
  children: React.ReactNode;
  initialValues?: DashboardState; // Allows App.tsx to hydrate defaults
}

export const DashboardProvider: React.FC<ProviderProps> = ({
  children,
  initialValues = {}
}) => {
  // Initialize state with hydration data
  const [widgetStates, setWidgetStates] = useState<DashboardState>(initialValues);

  /**
   * Updates a specific widget's state.
   * We use a shallow merge for the specific widget ID so that if you update 
   * 'start' date, it doesn't delete the 'end' date.
   */
  const setWidgetState = useCallback((id: string, value: any) => {
    setWidgetStates((prev) => {
      const currentWidgetState = prev[id] || {};

      // If the value is the same, return prev to avoid unnecessary re-renders
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
    setWidgetState
  }), [widgetStates, setWidgetState]);

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