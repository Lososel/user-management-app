import React from 'react';

type SortKeys = 'name' | 'email' | 'status' | 'last_login';

interface SortableHeaderProps {
    title: string;
    sortKey: SortKeys;
    currentSortKey: SortKeys;
    sortOrder: 'asc' | 'desc';
    onSort: (key: SortKeys) => void;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
    title,
    sortKey,
    currentSortKey,
    sortOrder,
    onSort,
}) => {
    const isActive = currentSortKey === sortKey;

    return (
        <th
        onClick={() => onSort(sortKey)}
        style={{ cursor: 'pointer', userSelect: 'none' }}
        >
            {title}{' '}
            {isActive && (sortOrder === 'asc' ? '▲' : '▼')}
        </th>
    );
};

export default SortableHeader;
