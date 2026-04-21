"use client";

import {
  Package,
  Truck,
  Heart,
  MapPin,
  ArrowLeft,
  ChartBar,
} from "lucide-react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/profile", label: "Profile", icon: Package },
    { href: "/orders", label: "Orders", icon: Truck },
    { href: "/addresses", label: "Addresses", icon: MapPin },
    { href: "/favorites", label: "Favorites", icon: Heart },
    { href: "/analytics", label: "Analytics", icon: ChartBar },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col">

      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 tracking-[0.02em] leading-[1.5]">
          Chronos
        </h2>
      </div>

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

      <nav className="flex-1 p-4 space-y-1 text-sm">
        {navItems.map((item, i) => {
          const Icon = item.icon;

          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={i}
              href={item.href}
              className={`flex items-center gap-2 p-3 rounded-xl tracking-[0.02em] leading-[1.5] transition ${
                isActive
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
  );
}