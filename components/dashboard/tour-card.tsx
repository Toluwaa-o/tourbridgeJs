import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import { ConfirmDeleteModal } from './delete-tour';
import { Id } from '@/convex/_generated/dataModel';
import { useState } from 'react';

export const TourCard = ({
  id,
  title,
  desc,
  status,
}: {
  id: string;
  title: string;
  desc: string;
  status: string;
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between">
        <Link href={`/dashboard/tours/${id}`} className="flex-1">
          <h3 className="text-lg font-semibold mb-1 text-[#0B0F19]">{title}</h3>
          <p className="text-gray-500 mb-4 text-sm">{desc}</p>
        </Link>

      <div className="flex items-center justify-between text-sm mt-4">
        <span
          className={`px-3 py-1 text-xs rounded-full capitalize font-medium ${
            status === 'active'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          {status}
        </span>

          <span className='flex item-center gap-4'>
            <Link
              href={`/dashboard/tours/${id}/edit`}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs font-medium"
            >
              <Pencil size={14} /> Edit
            </Link>

            <div
              onClick={() => setOpen(true)}
              className="flex cursor-default items-center gap-1 text-red-600 hover:text-red-800 text-xs font-medium"
            >
              <Trash2 size={14} /> Delete
            </div>
          </span>
        </div>
      </div>

      <ConfirmDeleteModal onClose={() => setOpen(false)} open={open} tourId={id as Id<'tours'>} />
    </>
  );
};
