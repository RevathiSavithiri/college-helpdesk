import React , {useState} from "react";
import { Link } from "react-router-dom";
import TicketCard from "../components/TicketCard";
import "./MyTickets.css";


function MyTickets({ tickets = []}) {

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const filteredTickets = tickets
    .filter((t) =>
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((t) =>
      filterCategory === "all" ? true : t.category === filterCategory
    )
    .sort((a, b) =>
      sortOrder === "newest"
        ? b.id.localeCompare(a.id)
        : a.id.localeCompare(b.id)
    );  

  return (
    <div className="page-container student-page">
      <h2>My Tickets</h2>

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

      {filteredTickets.length === 0 ? (
        <>  
         <p>No tickets raised yet.</p>
          <Link to="/raise-ticket">
            <button className="raise-btn">Raise your first ticket</button>
          </Link>
        </>
      ) : (
        <ul className="tickets-grid">
           {filteredTickets.map((t) =>(
            <TicketCard key={t.id} ticket={t} showStatusDropdown={false} 
                         updateTicketStatus={null} showEmailButton={false} />
           ))}
        </ul>
      )}
    </div>
  );
}

export default MyTickets;
