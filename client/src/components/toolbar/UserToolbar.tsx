import React from 'react';

interface Props {
    selectedCount: number;
    onBlock: () => void;
    onUnblock: () => void;
    onDelete: () => void;
}

const UsersToolbar: React.FC<Props> = ({ selectedCount, onBlock, onUnblock, onDelete }) => {
    return (
    <div className="toolbar mb-3">
        <button className="btn btn-warning me-2" onClick={onBlock} disabled={!selectedCount}>Block</button>
        <button className="btn btn-success me-2" onClick={onUnblock} disabled={!selectedCount}>Unblock</button>
        <button className="btn btn-danger" onClick={onDelete} disabled={!selectedCount}>Delete</button>
    </div>
    );
};

export default UsersToolbar;
