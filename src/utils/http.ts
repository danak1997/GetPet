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
        'Accept': 'application/json'
    };

    if (!(body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    if (hasToken()) {
        headers.Authorization = `Bearer ${getToken()}`;
    }

    const res = await fetch(url, {
        method,
        body,
        headers
    });

    if (!res.ok) throw new Error(await res.json());

    return await res.json();
}

export default http;
