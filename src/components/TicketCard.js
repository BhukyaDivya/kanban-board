// TicketCard.js
import React from 'react';
import './TicketCard.css';

const TicketCard = ({ title, description, type, priority, status, user, avatarUrl }) => {
    return (
        <div className="ticket-card">
            <div className="ticket-header">
                <img
                    src={avatarUrl || "https://via.placeholder.com/30"}
                    alt={user}
                    className="user-avatar"
                />
                <span className="ticket-title">{title}</span>
                <span className="ticket-user"> - {user}</span>
            </div>
            <div className="ticket-description">{description}</div>
            <div className="ticket-type">Type: {type}</div>
            <div className={`ticket-priority priority-${priority}`}>
                Priority: {priority}
            </div>
            <div className="ticket-status">Status: {status}</div>
        </div>
    );
};

export default TicketCard;
