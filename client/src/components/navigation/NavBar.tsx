import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
    username: string;
    onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ username, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        onLogout();
        navigate('/login');
    };

    return (
    <nav className="d-flex justify-content-between align-items-center p-2 mb-4 border-bottom">
        <div className="navbar-brand fw-bold fs-4">User Management App</div>
        <div className="d-flex align-items-center">
            <span className="text-muted m-2">{username}</span>
            <button className="btn btn-outline-danger btn-sm ms-auto" onClick={handleLogout}>
                Logout
            </button>
        </div>
    </nav>
    );
};

export default Navbar;
