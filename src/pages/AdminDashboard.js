import React, { useState } from "react";
import "./AdminDashboard.css";
import TicketCard from "../components/TicketCard";

function AdminDashboard({tickets = [], updateTicketStatus }) {

    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("newest");

    const filteredTickets = tickets
    .filter(
      (t) =>
        (t.id && t.id.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (t.name && t.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (t.description && t.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter((t) =>
      filterCategory === "all" ? true : t.category === filterCategory
    )
    .sort((a, b) =>
      sortOrder === "newest"
        ? b.id.localeCompare(a.id)
        : a.id.localeCompare(b.id)
    );


    return(
        <div className="page-container admin-page">
          <h2>Admin Dashboard</h2>

          <div className="controls">
            <input type="text" placeholder="Search by ID, name, description" value={searchTerm}
               onChange={(e)=> setSearchTerm(e.target.value)} />
        
        <select value={filterCategory} onChange={(e)=>setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="admission">Admission</option>
          <option value="exam">Exam</option>
          <option value="fees">Fees</option>
          <option value="hostel">Hostel</option>
          <option value="technical">Technical</option>
          <option value="placements">Placements</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>

      </div>

            {filteredTickets.length ===0 ? (
                <p>No tickets available.</p>
            ):(
                <ul className="tickets-grid">
                    {filteredTickets.map((t) =>(
                        <TicketCard key={t.id} ticket={t} showStatusDropdown={true} 
                                    updateTicketStatus={updateTicketStatus} 
                                    showEmailButton={true} />
                                 
                       ))}
                </ul>
            )}
        </div>
    );   
}


export default AdminDashboard; 