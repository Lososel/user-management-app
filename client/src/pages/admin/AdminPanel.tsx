import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminToolbar from '../../components/admin/AdminToolbar';
import AdminTable from '../../components/admin/AdminTable';
import Navbar from '../../components/navigation/NavBar';
import { useAdminPanel } from '../../hooks/useAdminPanel';
import { useUserProfile } from '../../hooks/useUserProfile';
import UserFilter from '../../components/filter/Filter';


const AdminPanel: React.FC = () => {
    const token = localStorage.getItem('token');
    const { user } = useUserProfile(token);
    const navigate = useNavigate();

    const {
        filteredUsers,
        selected,
        searchTerm,
        sortKey,
        sortOrder,
        setSearchTerm,
        handleSelect,
        handleSelectAll,
        handleDelete,
        handleBlock,
        handleUnblock,
        handleSort
    } = useAdminPanel(token);

    if (!token) {
        navigate('/login');
        return null;
    }

    return (
    <div className="container-fluid p-0">
        <Navbar username={user?.name || 'Admin'} onLogout={() => navigate('/login')} />
            <div className="container card p-3" style={{ paddingRight: '1rem' }}>
                <h4 className='mb-3' style={{ fontSize: '1.1rem' }}>admin panel</h4>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <AdminToolbar
                    selectedCount={selected.length}
                    onBlock={handleBlock}
                    onUnblock={handleUnblock}
                    onDelete={handleDelete}
                    />
                    <div className="ms-auto" >
                        <UserFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                    </div>
                </div>
                <AdminTable
                users={filteredUsers}
                selected={selected}
                onSelect={handleSelect}
                onSelectAll={handleSelectAll}
                onSort={handleSort}
                sortKey={sortKey}
                sortOrder={sortOrder}
                />
            </div>
    </div>
    );
};

export default AdminPanel;
