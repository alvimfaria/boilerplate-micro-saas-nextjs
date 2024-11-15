import React from "react";
import SideMenu from "../components/SideMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Menu Lateral */}
      <SideMenu />

      {/* Conteúdo Principal */}
      <main className="flex-grow p-6 bg-gray-100">{children}</main>
    </div>
  );
}
