export interface Unit {
  id: string;
  name: string
}

export interface Product {
  id: string;
  name: string;
  description: string;
  shelfLife: string;
  unit: Unit;
}

export interface Role {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  surName: string;
  nickName: string;
  roles: Role[];
}