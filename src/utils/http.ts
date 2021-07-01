import { getToken, hasToken } from './auth';

interface FetchOptions {
    body?: BodyInit;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

async function http(url: string, {
    method = 'GET',
    body
}: FetchOptions) {
    const headers: HeadersInit = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    if (hasToken()) {
        headers.Authorization = `Bearer ${getToken()}`;
    }

    const res = await fetch(url, {
        method,
        body,
        headers
    });

    return await res.json();
}

export default http;
