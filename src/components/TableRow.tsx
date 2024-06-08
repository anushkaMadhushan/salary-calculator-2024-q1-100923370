import React from 'react';

const TableRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <tr>
        <td>{label}</td>
        <td>{value}</td>
    </tr>
);

export default TableRow;
