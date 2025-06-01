/**
 * Delete User Dialog Component
 * Confirmation dialog for deleting users
 */

"use client";

import { UserApiService } from "@/api/entities/user.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "colori-platform-shared";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

/**
 * Delete user dialog props
 */
interface DeleteUserDialogProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserDeleted: (userId: string) => void;
}

/**
 * Delete user dialog component
 * @param props - Component props
 * @returns JSX element
 */
export function DeleteUserDialog({
  user,
  open,
  onOpenChange,
  onUserDeleted,
}: DeleteUserDialogProps): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle user deletion
   */
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await UserApiService.deleteUser({ id: user.id as string });
      onUserDeleted(user.id as string);
      onOpenChange(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      // You could add toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle dialog close
   */
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <AlertTriangle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle>Eliminar Usuario</DialogTitle>
              <DialogDescription>
                Esta acción no se puede deshacer.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            ¿Estás seguro de que quieres eliminar al usuario{" "}
            <span className="font-medium text-foreground">
              {user.firstName} {user.lastName}
            </span>{" "}
            ({user.email})?
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Se perderán todos los datos asociados a este usuario.
          </p>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Eliminando..." : "Eliminar Usuario"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
