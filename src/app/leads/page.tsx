"use client";

import { useEffect, useState } from "react";
import { getLeads } from "@/lib/storage";
import { Lead } from "@/lib/types";
import LeadTable from "@/components/LeadTable";
import Modal from "@/components/Modal";
import LeadForm from "@/components/LeadForm";
import LeadDetails from "@/components/LeadDetails";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<
    "All" | "New" | "Contacted" | "Converted"
  >("All");

  const refresh = () => setLeads(getLeads());

  useEffect(refresh, []);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      (lead.company || "").toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "All" || lead.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Leads</h2>
        <button
          onClick={() => setOpenAdd(true)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Lead
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <input
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        />

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="w-full sm:w-48 rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        >
          <option value="All">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Converted">Converted</option>
        </select>
      </div>

      <LeadTable leads={filteredLeads} onView={setSelectedLead} />
      <p className="text-sm text-slate-500 mb-2 mt-2">
        Showing {filteredLeads.length} of {leads.length} leads
      </p>

      <Modal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        title="Add New Lead"
      >
        <LeadForm
          onSuccess={() => {
            setOpenAdd(false);
            refresh();
          }}
        />
      </Modal>
      <Modal
        open={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        title="Lead Details"
      >
        {selectedLead && (
          <LeadDetails
            lead={selectedLead}
            onClose={() => setSelectedLead(null)}
            onUpdate={refresh}
          />
        )}
      </Modal>
    </div>
  );
}
