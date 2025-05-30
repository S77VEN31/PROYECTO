import React from "react";

interface AdminSectionHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function AdminSectionHeader({
  title,
  description,
  icon,
}: AdminSectionHeaderProps) {
  return (
    <div className="flex items-start gap-3 mb-4">
      {icon && (
        <div className="text-primary flex-shrink-0 mt-1">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}
