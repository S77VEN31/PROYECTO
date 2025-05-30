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
    <div className="container mx-auto py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 max-w-7xl space-y-6 sm:space-y-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary break-words">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">{subtitle}</p>
        )}
      </div>

      {children}
    </div>
  );
}
