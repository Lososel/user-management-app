import React from 'react';
import { formatDistanceToNow } from 'date-fns';

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

const AdminTable: React.FC<Props> = ({ users, selected, onSelect, onSelectAll }) => {
    const renderLastLogin = (lastLogin: string | null) => {
        if (!lastLogin) return '-';

        const loginDate = new Date(lastLogin);
        const relativeTime = formatDistanceToNow(loginDate, { addSuffix: true });

        return (
            <span title={loginDate.toLocaleString()}>
            {relativeTime}
            </span>
        );
    };

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
                <tr key={user.id} className={user.status === 'blocked' ? 'text-muted' : ''}>
                    <td>
                        <input
                        type="checkbox"
                        checked={selected.includes(user.id)}
                        onChange={() => onSelect(user.id)}
                        />
                    </td>
                    <td style={{ textDecoration: user.status === 'blocked' ? 'line-through' : 'none' }}>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.status}</td>
                    <td>{renderLastLogin(user.last_login)}</td>
                </tr>
            ))}
        </tbody>
    </table>
    );
};
export default AdminTable;
