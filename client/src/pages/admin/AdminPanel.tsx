import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUsers, blockUsers, unblockUsers } from '../../api/users'
import AdminTable from '../../components/admin/AdminTable';
import AdminToolbar from '../../components/admin/AdminToolbar';
import { useNavigate } from 'react-router-dom';

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
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        loadUsers();
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
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>User Management</h2>
                <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
            </div>
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
