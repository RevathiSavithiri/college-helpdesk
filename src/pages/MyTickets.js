import React from "react";
import { Link } from "react-router-dom";
import TicketCard from "../components/TicketCard";
import "./MyTickets.css";

function MyTickets({ tickets = [] }) {
  return (
    <div className="page-container student-page">
      <h2>My Tickets</h2>

      {tickets.length === 0 ? (
        <>
          <p>No tickets raised yet.</p>
          <Link to="/raise-ticket">
            <button className="raise-btn">Raise your first ticket</button>
          </Link>
        </>
      ) : (
        <ul className="tickets-grid">
          {tickets.map((t) => (
               <TicketCard  key={t.id} ticket={t} showStatusDropdown={false}
                            updateTicketStatus={null}  showEmailButton={false} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyTickets;
