import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import SortableHeader from '../sort/SortableHeader';

interface User {
    id: number;
    name: string;
    email: string;
    status: string;
    last_login: string | null;
}

type SortKeys = 'name' | 'email' | 'status' | 'last_login';

interface Props {
    users: User[];
    selected: number[];
    onSelect: (id: number) => void;
    onSelectAll: () => void;
    onSort: (key: SortKeys) => void;
    sortKey: SortKeys;
    sortOrder: 'asc' | 'desc';
}

const AdminTable: React.FC<Props> = ({
    users,
    selected,
    onSelect,
    onSelectAll,
    onSort,
    sortKey,
    sortOrder,
}) => {
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
        <div className="table-responsive">
            <table className="table table-striped table-hover table-sm" style={{ fontSize: '0.85rem' }}>
                <thead>
                    <tr>
                        <th>
                            <input
                            type="checkbox"
                            checked={selected.length === users.length && users.length > 0}
                            onChange={onSelectAll}
                        />
                        </th>
                        <SortableHeader
                        title="Name"
                        sortKey="name"
                        currentSortKey={sortKey}
                        sortOrder={sortOrder}
                        onSort={onSort}
                        />
                        <SortableHeader
                        title="Email"
                        sortKey="email"
                        currentSortKey={sortKey}
                        sortOrder={sortOrder}
                        onSort={onSort}
                        />
                        <SortableHeader
                        title="Status"
                        sortKey="status"
                        currentSortKey={sortKey}
                        sortOrder={sortOrder}
                        onSort={onSort}
                        />
                        <SortableHeader
                        title="Last Login"
                        sortKey="last_login"
                        currentSortKey={sortKey}
                        sortOrder={sortOrder}
                        onSort={onSort}
                        />
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
        </div>
    );
};
export default AdminTable;
