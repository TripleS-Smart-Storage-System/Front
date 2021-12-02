import { Product, Unit, User } from '../types';
import { get, post } from './AxiosWrapper'
import { AxiosResponse } from 'axios';
import { rejects } from 'assert';


export interface PostResponse {
  response: AxiosResponse | null | void
  error: string
}

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

async function createNewObject<T>(url: string, data: T): Promise<PostResponse> {
  let error = '';
  const response = await post(url, data).catch(function (err) {
    handleError(err);
    error = err.message;
  });
  const postResponse: PostResponse = {response: response, error: error}
  return postResponse
}

function handleError(error: any) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
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

export async function createNewProduct<T>(data: T): Promise<PostResponse> {
  return await createNewObject('/Product', data)
}

export async function signUp<T>(data: T): Promise<PostResponse> {
  return await createNewObject('/Account/register', data)
}

export async function signIn<T>(data: T): Promise<PostResponse> {
  return await createNewObject('/Account/login', data)
}
