export type WidgetType = 'KPI_CARD' | 'DATE_RANGE_SELECTOR' | 'REVENUE_CHART';

export interface WidgetConfig {
  id: string;
  type: WidgetType | string;
  layout: {
    w: number; // 1-12 span
    h?: number;
  };
  properties: Record<string, any>;
  listeningTo?: string[]; // IDs of widgets this widget observes
}

export interface DashboardSchema {
  meta: {
    title: string;
    subtitle: string;
  };
  layout: {
    columns: number;
    gap: number;
  };
  widgets: Record<string, WidgetConfig>;
}

export interface WidgetProps extends Record<string, any> {
  id: string;
  onEmit: (value: any) => void;
  subscribedData: Record<string, any>;
}