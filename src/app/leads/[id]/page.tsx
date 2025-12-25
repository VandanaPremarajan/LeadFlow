'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Lead, LeadStatus } from '@/lib/types';
import { getLeads, saveLeads } from '@/lib/storage';
import StatusBadge from '@/components/StatusBadge';

export default function LeadDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);

  useEffect(() => {
    const leads = getLeads();
    const found = leads.find(l => l.id === id);
    if (!found) {
      router.push('/leads');
      return;
    }
    setLead(found);
  }, [id, router]);

  const updateStatus = (status: LeadStatus) => {
    if (!lead) return;

    const leads = getLeads().map(l =>
      l.id === lead.id ? { ...l, status } : l
    );

    saveLeads(leads);
    setLead({ ...lead, status });
  };

  if (!lead) return null;

  return (
    <div className="max-w-xl bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold">{lead.name}</h2>

      <div className="text-sm text-gray-600 space-y-1">
        <p><strong>Email:</strong> {lead.email}</p>
        {lead.phone && <p><strong>Phone:</strong> {lead.phone}</p>}
        {lead.company && <p><strong>Company:</strong> {lead.company}</p>}
        <p>
          <strong>Status:</strong>{' '}
          <StatusBadge status={lead.status} />
        </p>
        <p>
          <strong>Created:</strong>{' '}
          {new Date(lead.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Update Status
        </label>
        <select
          value={lead.status}
          onChange={e => updateStatus(e.target.value as LeadStatus)}
          className="border rounded px-3 py-2"
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Converted">Converted</option>
        </select>
      </div>
    </div>
  );
}
