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

  const statCards = [
    { title: 'Total Leads', value: stats.total, color: 'bg-indigo-500' },
    { title: 'New', value: stats.new, color: 'bg-green-500' },
    { title: 'Contacted', value: stats.contacted, color: 'bg-yellow-500' },
    { title: 'Converted', value: stats.converted, color: 'bg-teal-500' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            color={card.color}
          />
        ))}
      </div>
    </div>
  );
}
