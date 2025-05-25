interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
}

export const mockStaff: User[] = [
  {
    id: "101",
    firstName: "Carlos",
    lastName: "Mendoza",
    email: "carlos.mendoza@colori.com",
    role: "server",
    active: true,
    createdAt: "2023-01-10T10:00:00Z",
    updatedAt: "2023-05-15T14:30:00Z",
    lastLogin: "2023-06-15T09:45:00Z",
  },
  {
    id: "102",
    firstName: "Patricia",
    lastName: "Gómez",
    email: "patricia.gomez@colori.com",
    role: "server",
    active: true,
    createdAt: "2023-02-05T09:30:00Z",
    updatedAt: "2023-05-10T11:20:00Z",
    lastLogin: "2023-06-14T16:30:00Z",
  },
  {
    id: "201",
    firstName: "Javier",
    lastName: "Rodríguez",
    email: "javier.rodriguez@colori.com",
    role: "chef",
    active: true,
    createdAt: "2023-01-05T08:15:00Z",
    updatedAt: "2023-04-20T10:45:00Z",
    lastLogin: "2023-06-15T08:00:00Z",
  },
  {
    id: "202",
    firstName: "Luisa",
    lastName: "Martinez",
    email: "luisa.martinez@colori.com",
    role: "chef",
    active: true,
    createdAt: "2023-01-15T11:30:00Z",
    updatedAt: "2023-03-25T09:20:00Z",
    lastLogin: "2023-06-15T07:55:00Z",
  },
  {
    id: "301",
    firstName: "Miguel",
    lastName: "Sánchez",
    email: "miguel.sanchez@colori.com",
    role: "manager",
    active: true,
    createdAt: "2023-01-01T09:00:00Z",
    updatedAt: "2023-05-05T15:40:00Z",
    lastLogin: "2023-06-15T17:30:00Z",
  },
  {
    id: "401",
    firstName: "Ana",
    lastName: "Ramírez",
    email: "ana.ramirez@colori.com",
    role: "admin",
    active: true,
    createdAt: "2023-01-01T08:00:00Z",
    updatedAt: "2023-06-01T10:15:00Z",
    lastLogin: "2023-06-15T18:20:00Z",
  },
];

interface AppUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export const mockUsers: AppUser[] = [
  {
    id: "u1",
    name: "Admin User",
    email: "admin@colori.com",
    role: "admin",
    avatar: "/avatars/admin.png",
  },
  {
    id: "u2",
    name: "Chef User",
    email: "chef@colori.com",
    role: "kitchen",
    avatar: "/avatars/chef.png",
  },
];
