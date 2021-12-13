import { Product, Unit, User, Role, Supply, Warehouse, Box } from '../types';
import { del, get, post, put } from './AxiosWrapper'
import { AxiosResponse } from 'axios';
import { SupplyWithProducts } from '../types';


export interface PostResponse {
  response: AxiosResponse | null | void
  error: string
}

async function getObjectList<T>(url: string): Promise<T[]> {
  const response = await get<T[]>(url).catch(function (err) {
    handleError(err);
  });
  const list: T[] = response?.data ?? new Array<T>();
  return list;
}

async function getObject<T>(url: string, id: string): Promise<T> {
  const response = await get<T>(`${url}/${id}`).catch(function (err) {
    handleError(err);
  });
  const obj: T = response?.data ?? {} as unknown as T;
  return obj;
}

async function createNewObject<T>(url: string, data: T): Promise<PostResponse> {
  let error = '';
  const response = await post(url, data).catch(function (err) {
    handleError(err);
    error = err.message;
  });
  const postResponse: PostResponse = {response: response, error: error}
  return postResponse
}

async function UpdateObject<T>(url: string, data: T): Promise<PostResponse> {
  let error = '';
  const response = await put(url, data).catch(function (err) {
    handleError(err);
    error = err.message;
  });
  const postResponse: PostResponse = {response: response, error: error}
  return postResponse
}

async function deleteObject(url: string, params?: any): Promise<PostResponse> {
  let error = '';
  const response = await del(url, params).catch(function (err) {
    handleError(err);
    error = err.message;
  });
  const postResponse: PostResponse = {response: response, error: error}
  return postResponse;
}

function handleError(error: any) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const response = error.response
    const status: number = response.status
    console.log(response.data);
    console.log(status);
    console.log(response.headers);
    if (status == 401 || status == 403) {
      const href =  "/" + status
      window.location.href = href
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
}

export async function getUnits() {
  return await getObjectList<Unit>('/units');
}

export async function getRoles() {
  return await getObjectList<Role>('/roles');
}

export async function getProducts() {
  return await getObjectList<Product>('/Products');
}

export async function getUsers() {
  return await getObjectList<User>('/users');
}

export async function getSupplies() {
  return await getObjectList<Supply>('/supplies');
}

export async function getWarehouses() {
  return await getObjectList<Warehouse>('/warehouses');
}

export async function getBoxes() {
  return await getObjectList<Box>('/Warehouses/boxes');
}

export async function getProduct(id: string) {
  return await getObject<Product>('/Products', id);
}

export async function getUser(id: string) {
  return await getObject<User>('/Users', id);
}

export async function getSupplyWithProducts(id: string) {
  return await getObject<SupplyWithProducts>('/supply-with-products', id);
}

export async function createNewProduct<T>(data: T): Promise<PostResponse> {
  return await createNewObject('/Products', data)
}

export async function createSupplyOrder<T>(data: T): Promise<PostResponse> {
  return await createNewObject('/Supply', data)
}

export async function createSupplyProductOrder<T>(data: T): Promise<PostResponse> {
  return await createNewObject('/supply-product', data)
}

export async function createNewWarehouse<T>(data: T): Promise<PostResponse> {
  return await createNewObject('/warehouses', data)
}

export async function signUp<T>(data: T): Promise<PostResponse> {
  return await createNewObject('/Account/register', data)
}

export async function signIn<T>(data: T): Promise<PostResponse> {
  return await createNewObject('/Account/login', data)
}

export async function updateRoles<T>(data: T): Promise<PostResponse> {
  return await createNewObject('/Account/change-roles', data)
}

export async function relocateBoxes<T>(data: T): Promise<PostResponse> {
  return await createNewObject('/Warehouses/relocate', data)
}

export async function updateProduct<T>(data: T): Promise<PostResponse> {
  return await UpdateObject('/Products', data)
}

export async function updateUser<T>(data: T): Promise<PostResponse> {
  return await UpdateObject('/Users', data)
}

export async function deleteProduct(id: string): Promise<PostResponse> {
  return await deleteObject('/Products', {id: id})
}

export async function deleteUser(id: string): Promise<PostResponse> {
  return await deleteObject('/Users', {id: id})
}

export async function deleteSupply(id: string): Promise<PostResponse> {
  return await deleteObject('/Supply', {id: id})
}

export async function deleteSupplyProduct(id: string): Promise<PostResponse> {
  return await deleteObject('/supply-product', {id: id})
}