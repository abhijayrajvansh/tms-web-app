import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { DataTable } from '@/components/data-table';
import { SectionCards } from '@/components/section-cards';
import { SiteHeader } from '../site-header';
import data from '@/lib/data.json';
import AnalyticsChart from '../AnalyticsChart';

export default function AdminDashboard() {
  return (
    <>
      <SiteHeader title='Dashboard'/>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <AnalyticsChart />
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
