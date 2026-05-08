import type { DashboardSchema } from '../types/dashboard';

const MOCK_CONFIG: DashboardSchema = {
  meta: { title: "Dashboard Rendering Engine" },
  layout: { columns: 12, gap: 20 },
  widgets: {
    "w_kpi_1": {
      id: "w_kpi_1",
      type: "KPI_CARD",
      layout: { w: 4 },
      properties: { title: "Total Users", value: "5000" }
    },
    "w_date_1": {
      id: "w_date_1",
      type: "DATE_RANGE_SELECTOR",
      layout: { w: 8 },
      properties: { title: "Date Range" }
    },
    "w_chart_1": {
      id: "w_chart_1",
      type: "REVENUE_CHART",
      layout: { w: 12 },
      listeningTo: ["w_date_1"],
      properties: { title: "Revenue Forecast" }
    },
    "w_err_1": {
      id: "w_err_1",
      type: "NON_EXISTENT_TYPE",
      layout: { w: 12 },
      properties: {}
    }
  }
};

export const fetchDashboardConfig = (): Promise<DashboardSchema> => {
  return new Promise((resolve) => {
    // Simulating network latency
    setTimeout(() => resolve(MOCK_CONFIG), 1000);
  });
};