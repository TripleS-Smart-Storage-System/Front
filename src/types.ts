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