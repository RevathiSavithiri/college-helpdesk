import React from 'react';
import emailjs from "emailjs-com";
import './TicketCard.css';
import { SiGmail } from "react-icons/si";

function TicketCard({ticket , showStatusDropdown , updateTicketStatus , showEmailButton }){

  const sendEmail = (newStatus) => {
    emailjs.send(
        "service_ngootpr",   
        "template_wo0sy7f",  
        {
           to_name : ticket.name ,
           message: ticket.description,
           status : newStatus,
           email: ticket.email,           
         
        },
        "7-5RTE31y78OuMw32"     //  EmailJS public key 
      )
      .then((response) => { 
        console.log("SUCCESS!", response.status ,response.text);
        alert(`Email sent to" ${ticket.email}`);
    })
      .catch((err) => { 
        console.error("FAILED...", err);
        alert("Email sending failed. Check console for error.");
  });
};


  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    updateTicketStatus(ticket.id, newStatus);
    // sendEmail(newStatus);  
  };
  
    return (
        <li className='ticket-card'>
            <p><strong>Ticket ID:</strong> {ticket.id}</p>
            <p><strong>Name:</strong> {ticket.name}</p>
            <p><strong>Email:</strong> {ticket.email}</p>
            <p><strong>Category:</strong> {ticket.category}</p>
            <p><strong>Description:</strong> {ticket.description}</p>

            {showStatusDropdown ? (
                <p><strong>Status:</strong>
                <select value={ticket.status} onChange={handleStatusChange} 
                        className={`status-${ticket.status.toLowerCase()}`}>
                        
                        <option value="Open">Open</option>
                        <option value="In-Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                </select>
              </p>
            ):(
                 <p> <strong>Status:</strong>{" "}
                     <span className={`status-${ticket.status.toLowerCase()}`}>{ticket.status}</span>
                 </p>
            )}

          {showEmailButton && (
          
          <button className="email-btn" 
                  onClick={() => sendEmail(ticket.status)} >
         
             <SiGmail style={{ marginRight: "6px", color: "red" }} /> Send Email
        </button>
      )}
        </li>
    );
}

export default TicketCard;