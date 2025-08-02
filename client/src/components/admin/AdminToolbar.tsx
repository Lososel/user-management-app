import React from 'react';
import { FaLock, FaLockOpen, FaTrash } from 'react-icons/fa'

interface Props {
    selectedCount: number;
    onBlock: () => void;
    onUnblock: () => void;
    onDelete: () => void;
}

const AdminToolbar: React.FC<Props> = ({ selectedCount, onBlock, onUnblock, onDelete }) => {
    return (
    <div className="toolbar d-flex align-items-center mb-3">
        <button 
        className="btn btn-outline-primary me-2 d-flex align-items-center"
        onClick={onBlock} 
        disabled={!selectedCount}
        >
            <FaLock className="me-1" /> Block
        </button>
        <button 
        className="btn btn-outline-success me-2 d-flex align-items-center" 
        onClick={onUnblock} 
        disabled={!selectedCount} 
        title="Unblock selected users">
            <FaLockOpen className="me-1" /> Unblock
        </button>
        <button 
        className="btn btn-outline-danger d-flex align-items-center" 
        onClick={onDelete} 
        disabled={!selectedCount} 
        title="Delete selected users">
            <FaTrash className="me-1" /> Delete
        </button>
        <span className="ms-3 text-muted medium">
        {selectedCount > 0 ? `${selectedCount} selected` : 'No selection'}
      </span>
    </div>
    );
};

export default AdminToolbar;
