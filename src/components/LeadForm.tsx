'use client';

import { useState } from 'react';
import { Lead, LeadStatus } from '@/lib/types';
import { getLeads, saveLeads } from '@/lib/storage';
import { useRouter } from 'next/navigation';

export default function LeadForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    status: 'New' as LeadStatus,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newLead: Lead = {
      id: crypto.randomUUID(),
      ...form,
      createdAt: new Date().toISOString(),
    };

    const leads = getLeads();
    saveLeads([...leads, newLead]);

    // router.push('/leads');
    onSuccess?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 space-y-4 max-w-lg"
    >
      <h2 className="text-lg font-semibold">Add New Lead</h2>

      <input
        name="name"
        required
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm
             focus:outline-none focus:ring-2 focus:ring-slate-900"
      />

      <input
        name="email"
        type="email"
        required
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm
             focus:outline-none focus:ring-2 focus:ring-slate-900"
      />

      <input
        name="phone"
        placeholder="Phone (optional)"
        value={form.phone}
        onChange={handleChange}
        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm
             focus:outline-none focus:ring-2 focus:ring-slate-900"
      />

      <input
        name="company"
        placeholder="Company (optional)"
        value={form.company}
        onChange={handleChange}
        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm
             focus:outline-none focus:ring-2 focus:ring-slate-900"
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm
             focus:outline-none focus:ring-2 focus:ring-slate-900"
      >
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Converted">Converted</option>
      </select>

      <button
        type="submit"
        className="w-full bg-slate-900 text-white rounded-md py-2 text-sm
             hover:bg-slate-800 transition"
      >
        Save Lead
      </button>
    </form>
  );
}
