"use client";

import { AdminMobileNav } from "@/components/common/admin-mobile-nav";
import { AdminSidebar } from "@/components/common/admin-sidebar";
import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* Sidebar - fixed on the left side */}
      <div className="fixed left-0 top-0 h-full z-30 hidden md:block">
        <AdminSidebar />
      </div>

      {/* Header, Main Content and Footer */}
      <div className="md:pl-64 min-h-screen flex flex-col">
        {/* Mobile header */}
        <div className="md:hidden flex items-center h-16 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
          <AdminMobileNav />
          <div className="ml-4">
            <span className="text-xl font-bold text-primary">Colori</span>
            <span className="text-lg text-muted-foreground ml-2">Admin</span>
          </div>
        </div>

        {/* Desktop header - sticky at top with blur effect */}
        <div className="hidden md:block sticky top-0 z-40">
          <Header variant="admin" />
        </div>

        {/* Main content - scrolls under the fixed header */}
        <main className="flex-1 p-4 md:p-6 bg-muted/20">{children}</main>

        {/* Footer */}
        <Footer variant="admin" />
      </div>
    </div>
  );
}
