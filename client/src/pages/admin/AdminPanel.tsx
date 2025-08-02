import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminToolbar from '../../components/admin/AdminToolbar';
import AdminTable from '../../components/admin/AdminTable';
import Navbar from '../../components/navigation/NavBar';
import { useAdminPanel } from '../../hooks/useAdminPanel';
import { useUserProfile } from '../../hooks/useUserProfile';

const AdminPanel: React.FC = () => {
    const token = localStorage.getItem('token');
    const { user } = useUserProfile(token);
    const navigate = useNavigate();

    const {
        users,
        selected,
        message,
        handleSelect,
        handleSelectAll,
        handleDelete,
        handleBlock,
        handleUnblock,
    } = useAdminPanel(token);

    if (!token) {
        navigate('/login');
        return null;
    }

    return (
    <div className="container-fluid p-0">
        <Navbar username={user?.name || 'Admin'} onLogout={() => navigate('/login')} />
            <div className="container card p-4">
                <h4>admin panel</h4>
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
                {message && <div className="alert alert-primary mt-3">{message}</div>}
            </div>
    </div>
    );
};

export default AdminPanel;
