import KpiCard from '../widgets/KpiCard';
import DateRangeSelector from '../widgets/DateRangeSelector';
import RevenueChart from '../widgets/RevenueChart';
import UnknownWidget from '../widgets/UnknownWidget';

const REGISTRY: Record<string, React.FC<any>> = {
  KPI_CARD: KpiCard,
  DATE_RANGE_SELECTOR: DateRangeSelector,
  REVENUE_CHART: RevenueChart,
};

export const getWidget = (type: string) => REGISTRY[type] || UnknownWidget;