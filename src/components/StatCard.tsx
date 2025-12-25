'use client';

export default function StatCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
      <div className={`absolute top-0 right-0 -mt-6 -mr-6 w-20 h-20 opacity-30 rounded-full ${color}`}></div>
      <div className="p-6 relative">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold mt-4 text-gray-900">{value}</p>
        <div className="mt-4 h-1 bg-gray-200 rounded-full">
          <div
            className={`${color} h-1 rounded-full`}
            style={{ width: `${Math.min(value * 10, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
