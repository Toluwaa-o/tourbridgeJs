import Link from 'next/link';

export const TourCard = ({
  id,
  title,
  desc,
  views,
  status,
}: {
  id: number;
  title: string;
  desc: string;
  views: number;
  status: string;
}) => {
  return (
    <Link
      href={`/dashboard/tours/${id}`}
      className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition"
    >
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-500 mb-4 text-sm">{desc}</p>

      <div className="flex items-center justify-between text-sm mt-4">
        <span className="font-medium text-gray-600">Views: {views}</span>
        <span
          className={`px-3 py-1 text-xs rounded-full capitalize font-medium ${
            status === 'active'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          {status}
        </span>
      </div>
    </Link>
  );
};
