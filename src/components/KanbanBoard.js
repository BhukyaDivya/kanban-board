// KanbanBoard.js
import React, { useState, useEffect } from 'react';
import Controls from './Controls';
import TicketCard from './TicketCard';

const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

const PRIORITY_LABELS = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No priority'
};


const KanbanBoard = () => {
    const [tickets, setTickets] = useState([]);
    const [grouping, setGrouping] = useState('status');
    const [sortBy, setSortBy] = useState('priority');

    const mockTickets = [
        { id: 1, title: 'CAM-01', description: 'Resolve critical bug', type: 'Bug', priority: 4, status: 'To Do', user: 'Alice' },
        { id: 2, title: 'CAM-02', description: 'UI improvements', type: 'Enhancement', priority: 2, status: 'In Progress', user: 'Bob' },
        { id: 3, title: 'CAM-03', description: 'Security vulnerability assessment', type: 'Feature Request', priority: 3, status: 'Done', user: 'Charlie' },
        { id: 4, title: 'CAM-04', description: 'Optimize database queries', type: 'Bug', priority: 1, status: 'In Progress', user: 'Alice' },
        { id: 5, title: 'CAM-05', description: 'Update documentation', type: 'Documentation', priority: 0, status: 'To Do', user: 'Bob' },
    ];

    // Fetch tickets data from the API or fallback to mock data
    useEffect(() => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => setTickets(data.length ? data : mockTickets))
            .catch(() => setTickets(mockTickets));
    }, []);

    const groupTickets = (tickets) => {
        const grouped = {};
        tickets.forEach(ticket => {
            const key = grouping === 'priority' ? PRIORITY_LABELS[ticket.priority] :
                        grouping === 'user' ? ticket.user || 'Unassigned' : ticket.status;
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(ticket);
        });
        return grouped;
    };

    const sortedTickets = (tickets) => {
        return [...tickets].sort((a, b) => 
            sortBy === 'priority' ? b.priority - a.priority : a.title.localeCompare(b.title)
        );
    };

    const groupedTickets = groupTickets(tickets);

    return (
        <div className="kanban-board">
            <Controls grouping={grouping} setGrouping={setGrouping} sortBy={sortBy} setSortBy={setSortBy} />

            <div className="board-columns">
                {Object.keys(groupedTickets).map((group) => (
                    <div key={group} className="kanban-column">
                        <h2>{group}</h2>
                        {sortedTickets(groupedTickets[group]).map(ticket => (
                            <TicketCard 
                                key={ticket.id}
                                title={ticket.title}
                                description={ticket.description}
                                type={ticket.type}
                                priority={ticket.priority}
                                status={ticket.status}
                                user={ticket.user}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KanbanBoard;
