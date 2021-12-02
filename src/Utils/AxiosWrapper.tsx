import axios, { AxiosResponse } from 'axios';
import config from '../config'
import { getToken } from './Common';

function getHeaders() {
    return {
            Auhorization: 'Bearer ' + getToken()
        }
}

export function getBaseUrl(): string {
    return config.serverUrl
}

export async function post<T>(url: string, data: T): Promise<AxiosResponse> {
    return await axios.post(getBaseUrl() + url, data, {headers: getHeaders()});
}

export async function get<T>(url: string, params?: any): Promise<AxiosResponse<T>> {
    const config = {params: params, headers: getHeaders()}
    return await axios.get<any, any, T>(getBaseUrl() + url, config);
}

export async function put<T>(url: string, data: T): Promise<AxiosResponse> {
    return await axios.put(getBaseUrl() + url, data, {headers: getHeaders()});
}

export async function del(url: string, params?: any): Promise<AxiosResponse> {
    const config = {params: params, headers: getHeaders()}
    return await axios.delete(getBaseUrl() + url, config);
}
