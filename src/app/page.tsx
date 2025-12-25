'use client';

import { useEffect, useState } from 'react';
import { getLeads } from '@/lib/storage';
import StatCard from '@/components/StatCard';

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    converted: 0,
  });

  useEffect(() => {
    const leads = getLeads();
    setStats({
      total: leads.length,
      new: leads.filter(l => l.status === 'New').length,
      contacted: leads.filter(l => l.status === 'Contacted').length,
      converted: leads.filter(l => l.status === 'Converted').length,
    });
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <StatCard title="Total Leads" value={stats.total} />
        <StatCard title="New" value={stats.new} />
        <StatCard title="Contacted" value={stats.contacted} />
        <StatCard title="Converted" value={stats.converted} />
      </div>
    </div>
  );
}
