import { useEffect, useState } from 'react';
import { fetchUsers, deleteUsers, blockUsers, unblockUsers } from '../api/users';

export interface User {
    id: number;
    name: string;
    email: string;
    status: string;
    last_login: string | null;
}

export function useAdminPanel(token: string | null) {
    const [users, setUsers] = useState<User[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (token) loadUsers();
    }, [token]);

    async function loadUsers() {
        const data = await fetchUsers(token!);
        const sortedUsers = (data.users || []).sort((a: User, b: User) => {
            const dateA = a.last_login ? new Date(a.last_login).getTime() : 0;
            const dateB = b.last_login ? new Date(b.last_login).getTime() : 0;
            return dateB - dateA;
        });
        setUsers(sortedUsers);
    }

    function showMessage(msg: string) {
        setMessage(msg);
        setTimeout(() => setMessage(''), 4000);
    }

    const handleSelect = (id: number) => {
        setSelected(prev => prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]);
    };

    const handleSelectAll = () => {
        setSelected(selected.length === users.length ? [] : users.map(u => u.id));
    };

    const handleDelete = async () => {
        await deleteUsers(token!, selected);
        showMessage('Users deleted successfully');
        setSelected([]);
        loadUsers();
    };

    const handleBlock = async () => {
        await blockUsers(token!, selected);
        showMessage('Users blocked successfully');
        setSelected([]);
        loadUsers();
    };

    const handleUnblock = async () => {
        await unblockUsers(token!, selected);
        showMessage('Users unblocked successfully');
        setSelected([]);
        loadUsers();
    };

    return {
        users,
        selected,
        message,
        handleSelect,
        handleSelectAll,
        handleDelete,
        handleBlock,
        handleUnblock,
        setSelected,
        setMessage
    };
}
