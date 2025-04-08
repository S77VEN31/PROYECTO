"use client";

import Link from "next/link";

interface FooterProps {
  variant: "admin" | "client" | "kitchen";
}

export function Footer({ variant }: FooterProps) {
  const getFooterText = () => {
    switch (variant) {
      case "admin":
        return "Panel de Administración";
      case "kitchen":
        return "Interfaz de Cocina";
      default:
        return "Todos los derechos reservados";
    }
  };

  return (
    <footer className="border-t py-4 md:py-6 bg-background">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Colori Restaurant
          {variant !== "client"
            ? ` - ${getFooterText()}`
            : ` - ${getFooterText()}`}
        </p>

        {variant === "client" && (
          <div className="flex items-center gap-4">
            <Link
              href="/terminos"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Términos de servicio
            </Link>
            <Link
              href="/privacidad"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Política de privacidad
            </Link>
          </div>
        )}
      </div>
    </footer>
  );
}
