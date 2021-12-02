import { Product, Unit, User } from '../types';
import { get } from './AxiosWrapper'

async function getObjectList<T>(url: string): Promise<T[]> {
  const response = await get<T[]>(url);
  const list: T[] = response.data;
  return list;
}

async function getObject<T>(url: string, params?: any): Promise<T> {
  const response = await get<T>(url, params);
  const obj: T = response.data;
  return obj;
}

export async function getUnits() {
  return await getObjectList<Unit>('/Unit/units');
}

export async function getProducts() {
  return await getObjectList<Product>('/Product/products');
}

export async function getUsers() {
  return await getObjectList<User>('/User/users');
}

export async function getProduct(id: String) {
  return await getObject<Product>('/Product', {id: id});
}

export async function getUser(id: String) {
  return await getObject<User>('/User', {id: id});
}
