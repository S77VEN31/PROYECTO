"use client";

import React from "react";

interface AdminPageLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function AdminPageLayout({
  children,
  title,
  subtitle,
}: AdminPageLayoutProps) {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
      </div>

      {children}
    </div>
  );
}
