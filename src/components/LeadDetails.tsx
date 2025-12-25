'use client';

import { Lead, LeadStatus } from '@/lib/types';
import { getLeads, saveLeads } from '@/lib/storage';
import StatusBadge from './StatusBadge';
import { useState } from 'react';

export default function LeadDetails({
  lead,
  onClose,
  onUpdate,
}: {
  lead: Lead;
  onClose: () => void;
  onUpdate: () => void;
}) {
  const [status, setStatus] = useState<LeadStatus>(lead.status);

  const update = () => {
    const leads = getLeads().map(l =>
      l.id === lead.id ? { ...l, status } : l
    );
    saveLeads(leads);
    onUpdate();
    onClose();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{lead.name}</h3>

      <p><strong>Email:</strong> {lead.email}</p>
      {lead.phone && <p><strong>Phone:</strong> {lead.phone}</p>}
      {lead.company && <p><strong>Company:</strong> {lead.company}</p>}

      <div>
        <p className="mb-5">
          <strong>Status:</strong> <StatusBadge status={status} />
        </p>
        <select
          value={status}
          onChange={e => setStatus(e.target.value as LeadStatus)}
          className="border rounded px-3 py-2"
        >
          <option>New</option>
          <option>Contacted</option>
          <option>Converted</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button onClick={onClose} className="px-3 py-2 text-sm">
          Cancel
        </button>
        <button
          onClick={update}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
