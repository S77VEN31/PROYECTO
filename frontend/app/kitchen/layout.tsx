"use client";

import { AuthGuard } from "@/components/auth";
import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";

export default function KitchenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col">
        <Header variant="kitchen" />
        <main className="flex-1 container mx-auto px-4 py-4">{children}</main>
        <Footer variant="kitchen" />
      </div>
    </AuthGuard>
  );
}
