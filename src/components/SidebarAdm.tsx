"use client";

import {
    Watch,
    Warehouse,
    Receipt,
    User,
    CreditCard,
    Truck,
    ChartBar,
    Tag,
    Megaphone,
    Settings,
    Headset,
} from "lucide-react";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SidebarAdm() {
    const pathname = usePathname();

    const navItems = [
        { href: "/watchcrud", label: "Watchs", icon: Watch },
        { href: "/stock", label: "Stock", icon: Warehouse },
        { href: "/orders", label: "Orders", icon: Receipt },
        { href: "/clients", label: "Clients", icon: User },
        { href: "/payment", label: "Payments", icon: CreditCard },
        { href: "/logistics", label: "Logistics", icon: Truck },
        { href: "/analytics", label: "Analytics", icon: ChartBar },
        { href: "/promotions", label: "Promotions", icon: Tag },
        { href: "/marketing", label: "Marketing", icon: Megaphone },
        { href: "/settings", label: "Settings", icon: Settings },
        { href: "/support", label: "Support", icon: Headset },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col">

            <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 tracking-[0.02em] leading-[1.5]">
                    Chronos
                </h2>
            </div>

            {
                /*
                 <div className="p-4">
                    <Link href="/collection">
                        <Button
                            variant="outline"
                            className="w-full justify-start gap-2 rounded-xl tracking-[0.02em] leading-[1.5] cursor-pointer"
                        >
                            <ArrowLeft size={16} />
                            Back to collection
                        </Button>
                    </Link>
                </div>
    
                */
            }

            <nav className="flex-1 p-4 space-y-1 text-sm">
                {navItems.map((item, i) => {
                    const Icon = item.icon;

                    const isActive = pathname.startsWith(item.href);

                    return (
                        <Link
                            key={i}
                            href={item.href}
                            className={`flex items-center gap-2 p-3 rounded-xl tracking-[0.02em] leading-[1.5] transition ${isActive
                                ? "bg-[#eef0ff] text-[#4455de] font-medium"
                                : "text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            <Icon size={16} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    )
}