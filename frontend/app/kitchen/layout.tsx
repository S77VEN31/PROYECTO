"use client";

import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";

export default function KitchenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header variant="kitchen" />
      <main className="flex-1 container mx-auto px-4 py-4">{children}</main>
      <Footer variant="kitchen" />
    </div>
  );
}
