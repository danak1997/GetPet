const localStorageKey = 'token';

export const saveToken = (token: string) => {
    localStorage.setItem(localStorageKey, token);
}

export const clearToken = () => {
    localStorage.removeItem(localStorageKey);
};

export const getToken = () => {
    return localStorage.getItem(localStorageKey);
}

const getTokenPayload = (token: string) => {
    return JSON.parse(atob(token.split('.')[1]))
};

export const hasToken = () => {
    const token = getToken();

    if (!token) return false;

    try {
        const tokenPayload = getTokenPayload(token);

        return !!tokenPayload.id && !!tokenPayload.email;
    } catch {
        return false;
    }
}
