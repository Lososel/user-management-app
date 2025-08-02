import React from 'react';

interface UserFilterProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="mb-3 d-flex justify-content-end p-2">
            <input
            type="text"
            className="form-control"
            placeholder="Filter.."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
        />
        </div>
    );
};

export default UserFilter;
