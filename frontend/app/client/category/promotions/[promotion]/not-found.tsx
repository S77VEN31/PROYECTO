import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

export default function PromotionNotFoundPage() {
  return (
    <div className="container mx-auto py-16 px-4 max-w-2xl text-center">
      <div className="bg-muted rounded-lg p-8 shadow-sm">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
          <Search className="h-8 w-8 text-rojo" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Promoción no encontrada</h1>

        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Lo sentimos, la promoción que estás buscando no existe o ha sido
          eliminada. Por favor, revisa nuestras otras promociones disponibles.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline">
            <Link href="/client">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Ir al inicio
            </Link>
          </Button>

          <Button asChild variant="rojo">
            <Link href="/client/category/promotions">
              Ver todas las promociones
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
