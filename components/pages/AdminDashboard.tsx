'use client';

import { DataTable } from '@/components/data-table';
import { SectionCards } from '@/components/section-cards';
import data from '@/lib/data.json';
import AnalyticsChart from '../AnalyticsChart';
import { SiteHeader } from '../site-header';

export default function AdminDashboard() {
  return (
    <>
      <SiteHeader title="Dashboard" />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1">
                <SectionCards />
                <div className="mt-4">
                  <AnalyticsChart />
                </div>
              </div>
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
