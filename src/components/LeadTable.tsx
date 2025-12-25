"use client";

import { Lead } from "@/lib/types";
import StatusBadge from "./StatusBadge";
import Link from "next/link";

export default function LeadTable({
  leads,
  onView,
}: {
  leads: Lead[];
  onView: (lead: Lead) => void;
}) {
  if (!leads.length) {
    return (
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <p className="text-gray-500">No leads yet.</p>
        <Link
          href="/leads/new"
          className="inline-block mt-4 text-sm font-medium text-blue-600"
        >
          Add your first lead →
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left font-medium text-slate-600">
              Name
            </th>
            <th className="px-6 py-3 text-left font-medium text-slate-600">
              Email
            </th>
            <th className="px-6 py-3 text-left font-medium text-slate-600">
              Company
            </th>
            <th className="px-6 py-3 text-left font-medium text-slate-600">
              Status
            </th>
            <th className="px-6 py-3 text-right font-medium text-slate-600">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b hover:bg-slate-50 transition">
              <td className="px-6 py-4 font-medium">{lead.name}</td>
              <td className="px-6 py-4 text-slate-600">{lead.email}</td>
              <td className="px-6 py-4 text-slate-600">
                {lead.company || "—"}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={lead.status} />
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onView(lead)}
                  className="text-blue-600 text-sm"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
