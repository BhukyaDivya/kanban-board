// Controls.js
import React from 'react';

const Controls = ({ grouping, setGrouping, sortBy, setSortBy }) => (
    <div className="controls">
        <label>Group By:</label>
        <select onChange={(e) => setGrouping(e.target.value)} value={grouping}>
            <option value="status">Status</option>
            <option value="priority">Priority</option>
            <option value="user">User</option>
        </select>

        <label>Sort By:</label>
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
        </select>
    </div>
);

export default Controls;
