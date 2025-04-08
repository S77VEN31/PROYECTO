"use client";

import { Logo } from "@/components/common/Logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <Card className="max-w-md w-full">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Logo width={150} height={150} linkTo={null} />
          </div>
          <CardDescription className="text-xl font-bold text-center">
            Iniciar Sesión
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-6" action="#" method="POST">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-address" className="text-foreground">
                  Correo electrónico
                </Label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Correo electrónico"
                  variant="cafe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Contraseña"
                  variant="cafe"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember-me" variant="cafe" />
                <Label
                  htmlFor="remember-me"
                  className="text-sm font-medium text-foreground"
                >
                  Recordarme
                </Label>
              </div>

              <div className="text-sm">
                <Link
                  href="#"
                  className="font-medium text-primary hover:text-primary/90"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <Button asChild variant="cafe" className="w-full">
                <Link href="/admin">Iniciar Sesión como Admin</Link>
              </Button>

              <Button asChild variant="celeste" className="w-full">
                <Link href="/kitchen">Iniciar Sesión como Cocina</Link>
              </Button>

              <Button asChild variant="naranja" className="w-full">
                <Link href="/client">Entrar como Cliente</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
