const API_URL = import.meta.env.VITE_USERS_URL;

export async function fetchUsers(token: string) {
    const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
}

async function request<T>(url: string, method: string, token: string, body?: object): Promise<T> {
    const res = await fetch(url, {
        method,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Request failed');
    }

    return res.json();
}

export const deleteUsers = (token: string, userIds: number[]) =>
    request(`${API_URL}`, 'DELETE', token, { userIds });

export const blockUsers = (token: string, userIds: number[]) =>
    request(`${API_URL}/block`, 'PATCH', token, { userIds });

export const unblockUsers = (token: string, userIds: number[]) =>
    request(`${API_URL}/unblock`, 'PATCH', token, { userIds });
