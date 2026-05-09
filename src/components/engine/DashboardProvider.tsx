import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

// Defining a clear interface for the internal state
type DashboardState = Record<string, any>;

interface DashboardContextType {
  widgetStates: DashboardState;
  // Using a functional update pattern similar to React's useState for flexibility
  setWidgetState: (id: string, value: any) => void;
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

  /**
   * Updating a specific widget's state.
   * We use a shallow merge for the specific widget ID so that if you update 
   * the 'start' date, it doesn't delete the 'end' date.
   */
  const setWidgetState = useCallback((id: string, value: any) => {
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