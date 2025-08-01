import React, { useEffect, useState } from 'react';
import UserTable from '../../components/table/UserTable';

const AdminPanel: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            window.location.href = '/login';
        } else {
            setToken(storedToken);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    if (!token) return null;

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between mb-3">
                <h2>User Management</h2>
                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <UserTable token={token} />
        </div>
    );
};

export default AdminPanel;
