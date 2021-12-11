export interface Idable{
  id: string;
}

export interface INameable extends Idable{
  name: string;
}

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

export interface AcceptUser {
  id: string;
  name: string;
  surName: string;
  nickName: string;
}

export interface SupplyCreatedUser {
  id: string;
  name: string;
  surName: string;
  nickName: string;
}

export interface Supply {
  id: string;
  supplyCreatedUserId: string;
  acceptUserId: string;
  dateOrdered: Date;
  dateAccepted: Date;
  isArrived: boolean;
  acceptUser: AcceptUser;
  supplyCreatedUser: SupplyCreatedUser;
}

export interface AcceptUser {
  id: string;
  name: string;
  surName: string;
  nickName: string;
}

export interface SupplyCreatedUser {
  id: string;
  name: string;
  surName: string;
  nickName: string;
}

export interface SupplyProduct {
  id: string;
  supplyId: string;
  productId: string;
  count: number;
  isAccepted: boolean;
  productCreatedDate: Date;
  product: Product;
}

export interface SupplyWithProducts{
  id: string;
  supplyCreatedUserId: string;
  acceptUserId: string;
  dateOrdered: Date;
  dateAccepted: Date;
  isArrived: boolean;
  acceptUser: AcceptUser;
  supplyCreatedUser: SupplyCreatedUser;
  supplyProducts: SupplyProduct[];
}

export interface Warehouse{
  id: string;
  address: string;
  email: string;
}