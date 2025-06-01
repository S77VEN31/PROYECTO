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
import {
  getDeleteDialogContentClass,
  getDeleteDialogEntityNameClass,
  getDeleteDialogIconClass,
  getDeleteDialogIconContainerClass,
  getDeleteDialogMainTextClass,
  getDeleteDialogSecondaryTextClass,
} from "@/lib/utils";
import { User } from "colori-platform-shared";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";

/**
 * Delete user dialog props
 */
interface DeleteUserDialogProps {
  user: User | null;
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
}: DeleteUserDialogProps): React.JSX.Element | null {
  const [isLoading, setIsLoading] = useState(false);

  // Early return if user is null to prevent errors
  if (!user) {
    return null;
  }

  /**
   * Handle user deletion
   */
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await UserApiService.deleteUser({ id: user.id });
      onUserDeleted(user.id);
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
            <div className={getDeleteDialogIconContainerClass()}>
              <AlertTriangle className={getDeleteDialogIconClass()} />
            </div>
            <div>
              <DialogTitle>Eliminar Usuario</DialogTitle>
              <DialogDescription>
                Esta acción no se puede deshacer.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className={getDeleteDialogContentClass()}>
          <p className={getDeleteDialogMainTextClass()}>
            ¿Estás seguro de que quieres eliminar al usuario{" "}
            <span className={getDeleteDialogEntityNameClass()}>
              {user.firstName} {user.lastName}
            </span>{" "}
            ({user.email})?
          </p>
          <p className={getDeleteDialogSecondaryTextClass()}>
            Se perderán todos los datos asociados a este usuario, incluyendo
            historial de pedidos y configuraciones.
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
