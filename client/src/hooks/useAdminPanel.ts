import { useEffect, useState } from 'react';
import { fetchUsers, deleteUsers, blockUsers, unblockUsers } from '../api/users';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export interface User {
    id: number;
    name: string;
    email: string;
    status: string;
    last_login: string | null;
}
export type SortKeys = 'name' | 'email' | 'status' | 'last_login';

export function useAdminPanel(token: string | null) {
    const [users, setUsers] = useState<User[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState<SortKeys>('last_login');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const navigate = useNavigate();

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

    function handleSort(key: 'name' | 'email' | 'status' | 'last_login') {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    }

    const handleSelect = (id: number) => {
        setSelected(prev => prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]);
    };

    const handleSelectAll = () => {
        setSelected(selected.length === users.length ? [] : users.map(u => u.id));
    };

    const handleDelete = async () => {
        await deleteUsers(token!, selected);
        toast.warn('Users deleted successfully');
        const currentUserId = Number(JSON.parse(atob(token!.split('.')[1])).id);
        if (selected.includes(currentUserId)) {
            localStorage.removeItem('token');
            navigate('/login');
            return;
        }
        setSelected([]);
        loadUsers();
    };

    const handleBlock = async () => {
        await blockUsers(token!, selected);
        toast.info('Users blocked successfully');
        const currentUserId = Number(JSON.parse(atob(token!.split('.')[1])).id);
        if (selected.includes(currentUserId)) {
            localStorage.removeItem('token');
            navigate ('/login');
            return;
        }
        setSelected([]);
        loadUsers();
    };

    const handleUnblock = async () => {
        await unblockUsers(token!, selected);
        toast.success('Users unblocked successfully');
        setSelected([]);
        loadUsers();
    };

    const filteredUsers = users
    .filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
        const valA = a[sortKey] || '';
        const valB = b[sortKey] || '';
        
        if (sortKey === 'last_login') {
            return sortOrder === 'asc'
            ? new Date(valA || 0).getTime() - new Date(valB || 0).getTime()
            : new Date(valB || 0).getTime() - new Date(valA || 0).getTime();
        }
        return sortOrder === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

    return {
        users,
        filteredUsers,
        selected,
        searchTerm,
        setSearchTerm,
        handleSelect,
        handleSelectAll,
        handleDelete,
        handleBlock,
        handleUnblock,
        setSelected,
        sortKey,
        sortOrder,
        handleSort
    };
}
