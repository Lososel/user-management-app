import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUsers, blockUsers, unblockUsers } from '../../api/users'
import UsersTable from '../../components/table/UserTable';
import UsersToolbar from '../../components/toolbar/UserToolbar';

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
        setSelected([]);
        loadUsers();
    };

    const handleBlock = async () => {
        await blockUsers(token!, selected);
        setSelected([]);
        loadUsers();
    };

    const handleUnblock = async () => {
        await unblockUsers(token!, selected);
        setSelected([]);
        loadUsers();
    };

    return (
        <div className="container mt-4">
            <h2>User Management</h2>
            <UsersToolbar
            selectedCount={selected.length}
            onBlock={handleBlock}
            onUnblock={handleUnblock}
            onDelete={handleDelete}
        />
        <UsersTable
        users={users}
        selected={selected}
        onSelect={handleSelect}
        onSelectAll={handleSelectAll}
        />
        </div>
    );
};

export default AdminPanel;
