import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Tour } from '@/types/dashboard/tour'
import Link from 'next/link'

export const TourCardMain = ({ t }: { t: Tour }) => {
    return (
        <Link href={`/dashboard/tours/${t.id}`}>
            <Card className="rounded-2xl shadow-sm border hover:shadow-md transition cursor-pointer">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">{t.title}</h2>
                        <span
                            className={`text-xs px-3 py-1 rounded-full capitalize font-medium ${t.status === "active"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-200 text-gray-700"
                                }`}
                        >
                            {t.status}
                        </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-6">{t.desc}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{t.views.toLocaleString()} views</span>
                        <button className="text-black font-medium hover:underline">Manage</button>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
