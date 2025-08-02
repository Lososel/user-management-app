const API_URL = 'http://localhost:5001/api/users';

export async function fetchUsers(token: string) {
    const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
}

export async function deleteUsers(token: string, userIds: number[]) {
    await fetch(API_URL, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    body: JSON.stringify({ userIds }),
    });
}

export async function blockUsers(token: string, userIds: number[]) {
    await fetch(`${API_URL}/block`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userIds }),
    });
}

export async function unblockUsers(token: string, userIds: number[]) {
    await fetch(`${API_URL}/unblock`, {
        method: 'PATCH',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userIds }),
    });
}
