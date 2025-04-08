import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";

export default function PromocionesLoadingPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row md:items-center mb-8 gap-4">
        <div className="flex-1">
          <div className="inline-flex items-center mb-2">
            <Button disabled variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Skeleton className="h-10 w-48" />
          </div>
          <Skeleton className="h-5 w-full max-w-md mt-2" />
        </div>
        <div>
          <Skeleton className="h-10 w-40 mr-2 inline-block" />
          <Skeleton className="h-10 w-48 inline-block" />
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Contenido principal */}
      <Tabs defaultValue="all">
        <TabsList className="mb-8">
          <Skeleton className="h-10 w-full" />
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-96 w-full rounded-lg" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
