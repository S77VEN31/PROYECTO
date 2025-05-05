"use client";

import { Header } from "@/components/common/header";

export default function KitchenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="admin" />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
} 