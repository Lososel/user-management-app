import React, { useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    status: string;
    last_login: string | null;
}

interface UserTableProps {
    token: string;
}

const UserTable: React.FC<UserTableProps> = ({ token }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [message, setMessage] = useState('');
    
    useEffect(() => {
        fetch('http://localhost:5001/api/users', {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => res.json())
        .then((data) => setUsers(data.users || []))
        .catch(() => setMessage('Failed to fetch users'));
    }, [token]);

    const toggleUser = (id: number) => {
        setSelectedUsers((prev) =>
            prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedUsers.length === users.length) {
        setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((u) => u.id));
    }
    };

    const isSelected = (id: number) => selectedUsers.includes(id);

    return (
        <div className="card p-3">
            <div className="d-flex justify-content-between mb-3">
                <div>
                    <button className="btn btn-warning me-2" disabled={!selectedUsers.length}>
                        Block
                    </button>
                    <button className="btn btn-success me-2" disabled={!selectedUsers.length}>
                        Unblock
                    </button>
                    <button className="btn btn-danger" disabled={!selectedUsers.length}>
                        Delete
                    </button>
                </div>
                {message && <span className="text-danger">{message}</span>}
            </div>
            
            <table className="table table-bordered table-striped text-center">
                <thead className="table-light">
                    <tr>
                        <th>
                            <input
                            type="checkbox"
                            checked={selectedUsers.length === users.length && users.length > 0}
                            onChange={toggleSelectAll}
                            />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Last Login</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <input
                                type="checkbox"
                                checked={isSelected(user.id)}
                                onChange={() => toggleUser(user.id)}
                                />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.status}</td>
                            <td>{user.last_login ? new Date(user.last_login).toLocaleString() : 'Never'}</td>
                        </tr>
                        ))
                    ) : (
                    <tr>
                        <td colSpan={5} className="text-center">No users found</td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
