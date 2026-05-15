import React from 'react';
import type { DashboardSchema } from '../../types/dashboard';
import { getWidget } from './WidgetRegistry';
import { useDashboard } from './DashboardProvider';

export const DashboardRenderer: React.FC<{ config: DashboardSchema }> = ({ config }) => {
  const { error, setError } = useDashboard();
  return (
    <div
      className="grid w-full max-w-7xl mx-auto p-6"
      style={{
        gridTemplateColumns: `repeat(${config.layout.columns}, minmax(0, 1fr))`,
        gap: `${config.layout.gap}px`
      }}
    >
      {error && <p>{error}</p>}
      {Object.entries(config.widgets).map(([id, widget]) => (
        <WidgetWrapper key={id} id={id} config={widget} />
      ))}
    </div>
  );
};

const WidgetWrapper = ({ id, config }: { id: string, config: any }) => {
  const { widgetStates, setWidgetState } = useDashboard();
  const WidgetComponent = getWidget(config.type);

  // Subscribing to relevant state changes
  const dependencies = (config.listeningTo || []).reduce((acc: any, depId: string) => {
    acc[depId] = widgetStates[depId];
    return acc;
  }, {});

  console.log('config', config);

  const hideIfRender = config.hideIfRender;

  return (
    <div
      className="bg-white border rounded-xl shadow-sm overflow-hidden"
      style={{ gridColumn: `span ${config.layout.w}` }}
    >
      <div className="p-6 h-full">
        <WidgetComponent
          {...config.properties}
          id={id}
          type={config.type} // Pass type so UnknownWidget knows what failed
          subscribedData={dependencies}
          onEmit={(val: any) => setWidgetState(id, val)}
          hideIfRender={hideIfRender}
        />
      </div>
    </div>
  );
};