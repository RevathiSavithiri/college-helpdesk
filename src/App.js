import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from "./pages/Home";
import RaiseTicket from "./pages/RaiseTicket";
import MyTickets from "./pages/MyTickets";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
     const [user, setUser] = useState(null);
     const [tickets, setTickets] = useState(()=>{
    
     try {
    const saved = localStorage.getItem("tickets");
    return saved ? JSON.parse(saved) : [];
    } catch (error) {
    console.error("Corrupted localStorage data:", error);
    return [];
  }
});

     useEffect(()=>{
      localStorage.setItem("tickets",JSON.stringify(tickets));
     },[tickets]);

    // Ticket Format: TKT-DDMMYYYY-HHMMSS
     const generateTicketId =() => {
      const now = new Date ();

      const date = String(now.getDate()).padStart(2,"0");
      const month = String(now.getMonth()+1).padStart(2,"0");
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2,"0");
      const minutes = String(now.getMinutes()).padStart(2,"0");
      const seconds = String(now.getSeconds()).padStart(2,"0");

      return `TKT-${date}${month}${year}-${hours}${minutes}${seconds}`;
     }

      const addTicket = (ticket) => {
          const newTicket ={
            ...ticket,
            id: generateTicketId(),
            status: "Open"
          };

          setTickets([...tickets, newTicket]); 
   
      };

      const updateTicketStatus = (id, newStatus) => {
       setTickets((prevTickets) =>
       prevTickets.map((ticket) =>
       ticket.id === id ? { ...ticket, status: newStatus } : ticket
    )
   );
 };


  return (
    <Router>
      {user && <Navbar user={user} setUser={setUser} />}
      <Routes>
        <Route path='/login' element={<Login setUser={setUser} />} />
        
        {/* Student Routes */}
        <Route path='/home' element={user?.role === "student" ? <Home /> : <Login setUser={setUser}/>} />
        <Route path='/raise-ticket' element={user?.role === "student" ? <RaiseTicket addTicket={addTicket}/> : <Login setUser={setUser} />} />
        <Route path='/my-tickets' element={user?.role === "student" ? <MyTickets tickets={tickets}/>: <Login setUser={setUser} />} />

         {/* Admin Route */}
        <Route path="/admin" element={user?.role === "admin" ? <AdminDashboard tickets={tickets} updateTicketStatus={updateTicketStatus}/> : <Login setUser={setUser} />} />
        
        {/* Default */}
        <Route path="*" element={<Login setUser={setUser} />} />
      </Routes>
    </Router>
    
  );
}

export default App;
