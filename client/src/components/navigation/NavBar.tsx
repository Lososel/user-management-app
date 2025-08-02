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
    <nav className="navbar navbar-light bg-light px-4 mb-4 d-flex justify-content-between align-items-center shadow-sm">
        <div className="navbar-brand fw-bold fs-4">User Management App</div>
        <div className="d-flex align-items-center gap-3">
            <span className="text-muted">Hello, {username}</span>
            <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                Logout
            </button>
        </div>
    </nav>
    );
};

export default Navbar;
