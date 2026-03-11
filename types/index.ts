export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  avatarUrl: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserClient extends User {
  id: string;
  userId: string;
  address: string;
}

export interface UserProvider extends User {
  id: string;
  userId: string;
  categories: Category[];
  othersCategory?: string;
  bio: string;
  neighborhood: string;
  radius: number;

}

interface Category {
  id: string;
  name: string;
  icon?: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  photos: string[];
  price: number;
  providerId: string;
  clientId: string;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
}

export enum Role {
  ADMIN = "admin",
  USER = "user",
  PROVIDER = "provider",
}
