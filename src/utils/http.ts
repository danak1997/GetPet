interface FetchOptions {
    body?: BodyInit;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

async function http(url: string, {
    method = 'GET',
    body
}: FetchOptions) {
    const res = await fetch(url, {
        method,
        body,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return await res.json();
}

export default http;
