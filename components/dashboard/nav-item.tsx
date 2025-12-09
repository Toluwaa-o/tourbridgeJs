import Link from "next/link";

export const NavItem = ({ icon: Icon, label, active, page_link }: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>, label: string, active?: boolean, page_link: string }) => {
    return (
        <Link
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition ${active ? "bg-gray-100 text-gray-900 font-medium" : "text-gray-600 hover:bg-gray-100"
                }`}
                href={page_link}
        >
            <Icon width={18} height={18} />
            {label}
        </Link>
    );
}