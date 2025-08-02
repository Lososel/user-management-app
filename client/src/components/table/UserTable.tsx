import React from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    status: string;
    last_login: string | null;
}

interface Props {
    users: User[];
    selected: number[];
    onSelect: (id: number) => void;
    onSelectAll: () => void;
}

const UsersTable: React.FC<Props> = ({ users, selected, onSelect, onSelectAll }) => {
    return (
    <table className="table table-striped table-hover">
        <thead>
            <tr>
                <th>
                    <input
                    type="checkbox"
                    checked={selected.length === users.length && users.length > 0}
                    onChange={onSelectAll}
                />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Last Login</th>
            </tr>
        </thead>
        <tbody>
            {users.map(user => (
                <tr key={user.id}>
                    <td>
                        <input
                        type="checkbox"
                        checked={selected.includes(user.id)}
                        onChange={() => onSelect(user.id)}
                        />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.status}</td>
                    <td>{user.last_login ? new Date(user.last_login).toLocaleString() : '-'}</td>
                </tr>
            ))}
        </tbody>
    </table>
    );
};
export default UsersTable;
