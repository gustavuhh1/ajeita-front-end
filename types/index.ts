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


export interface Servico {
  id: number;
  title: string;
  category: string;
  type: string;
  location: string;
  distance: string;
  distanceValue: number;
  priceRange: string;
  priceMin: number;
  priceMax: number;
  timeAgo: string;
  isNew: boolean;
  highlighted: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  photos: string[];
}


export enum Role {
  ADMIN = "admin",
  USER = "user",
  PROVIDER = "provider",
}

export interface Provider {
  id: number;
  name: string;
  role: string;
  rating?: number;
  reviews?: number;
  price: number;
  unit: string;
  tags: string[];
  category: string; 
  image?: string | null; 
  location?: string;
}

export interface FileWithPreview {
  file: File;
  preview: string;
}