export type UserRole = "admin" | "manager" | "chef" | "server" | "cashier";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
}
