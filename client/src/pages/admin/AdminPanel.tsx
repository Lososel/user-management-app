import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUsers, blockUsers, unblockUsers } from '../../api/users'
import AdminTable from '../../components/admin/AdminTable';
import AdminToolbar from '../../components/admin/AdminToolbar';

interface User {
    id: number;
    name: string;
    email: string;
    status: string;
    last_login: string | null;
}

const AdminPanel: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
    loadUsers();
    }, []);
    const [message, setMessage] = useState('');

    async function loadUsers() {
        const data = await fetchUsers(token!);
        setUsers(data.users || []);
    }

    const handleSelect = (id: number) => {
        setSelected(prev => prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]);
    };

    const handleSelectAll = () => {
        setSelected(selected.length === users.length ? [] : users.map(u => u.id));
    };

    const handleDelete = async () => {
        await deleteUsers(token!, selected);
        setMessage('Users deleted successfully');
        setSelected([]);
        loadUsers();
    };

    const handleBlock = async () => {
        await blockUsers(token!, selected);
        setMessage('Users blocked successfully');
        setSelected([]);
        loadUsers();
    };

    const handleUnblock = async () => {
        await unblockUsers(token!, selected);
        setMessage('Users unblocked successfully');
        setSelected([]);
        loadUsers();
    };

    return (
        <div className="container mt-4">
            <h2>User Management</h2>
            <AdminToolbar
            selectedCount={selected.length}
            onBlock={handleBlock}
            onUnblock={handleUnblock}
            onDelete={handleDelete}
        />
        <AdminTable
        users={users}
        selected={selected}
        onSelect={handleSelect}
        onSelectAll={handleSelectAll}
        />
        {message && <div className="alert alert mt-3">{message}</div>}
        </div>
    );
};

export default AdminPanel;
