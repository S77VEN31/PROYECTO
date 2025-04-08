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
    <div className="flex items-center gap-3 mb-4">
      {icon && <div className="text-primary">{icon}</div>}
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
