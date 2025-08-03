import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface UserFilterProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="mb-3 d-flex justify-content-end align-items-center p-2">
            <FaSearch className="me-2 text-muted" />
            <input
            type="text"
            className="form-control form-control-sm"
            style={{ maxWidth: 150 }}
            placeholder="Filter"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
        />
        </div>
    );
};

export default UserFilter;
