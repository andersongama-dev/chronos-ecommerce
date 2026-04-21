"use client";

import Header from "@/components/Header";
import SidebarAdm from "@/components/SidebarAdm";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex">
      <SidebarAdm/>
      {children}
    </div>
  );
}