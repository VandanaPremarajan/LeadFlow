import { LeadStatus } from '@/lib/types';

export default function StatusBadge({ status }: { status: LeadStatus }) {
  const styles = {
  New: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  Contacted: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  Converted: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
};


  return (
    <span
      className={`text-xs font-medium px-2 py-1 rounded ${styles[status]}`}
    >
      {status}
    </span>
  );
}
