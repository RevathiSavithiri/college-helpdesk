import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./TicketCard.css";

function TicketCard({ ticket , showStatusDropdown , updateTicketStatus , showEmailButton,removeTicket }) {
  const [showModal, setShowModal] = useState(false);
  const [emailData, setEmailData] = useState({
    to: ticket.email,
    message: ""
  });

  const [fullscreenImage, setFullscreenImage] = useState(null);
  
  const sendAcknowledgement = () => {

    emailjs.send(
    "service_ngootpr",  // service ID
    "template_wo0sy7f", // template ID
    {
      to_name: ticket.name ,
      ticket_id: ticket.id,
      ticket_category: ticket.category,
      email: ticket.email,    
    
     },
        "7-5RTE31y78OuMw32"     //  EmailJS public key 
      )
      .then(() => {
        alert(`Email sent to ${ticket.email} for Ticket ID: ${ticket.id}`);
      })
      .catch((err) => {
        console.error("FAILED...", err);
        alert("Failed to send email.");
      });
  };

  const handleSendEmail = () => {

   emailjs.send(
        "service_ngootpr",
        "template_u030ndb",
        {
          to_name: ticket.name,
          ticket_id: ticket.id,
          ticket_category: ticket.category,
          email: ticket.email,   
          message: emailData.message        
        },
       "7-5RTE31y78OuMw32" 
       )
       .then(() => {
           alert(`Email sent to ${emailData.to}`);
           setShowModal(false);
        })
        .catch((err) => {
            console.error("FAILED...", err);
            alert("Failed to send email.");
        });
     };

     const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        updateTicketStatus(ticket.id, newStatus);
     
      };


  return (
    <div className="ticket-card">
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

           
             {(showEmailButton || removeTicket) && (
                <div className="btn-grp">
                  {showEmailButton && (
                   <>
                     <button className="email-btn" onClick={sendAcknowledgement}>Send Email</button>
                     <button className="email-btn" onClick={() => setShowModal(true)}>Compose Email</button>
                   </>
                   )}
                  {removeTicket && (
                      <button className="remove-btn" onClick={() => removeTicket(ticket.id)}>Remove Ticket</button>
                  )}
               </div>
             )}

                      
              {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                  <div className="modal" onClick={(e) => e.stopPropagation()}>
            
                    <button className="modal-close" onClick={() => setShowModal(false)}> ✕ </button>

                    <h3>Compose Email</h3>
          
                    <textarea  placeholder="Message" value={emailData.message}
                    onChange={(e) => setEmailData({ ...emailData, message: e.target.value })} />
         
                    <button className="e-btn" onClick={handleSendEmail}> Send </button>            
                 </div>
               </div>
              )}

       
              {ticket.attachments && ticket.attachments.length > 0 && (
                <div className="attachments">
                  <strong>Attachments:</strong>
                  <div className="preview-container">
                    {ticket.attachments.map((file, index) => (
                      <div key={index} className="preview-item">
                       {file.type.startsWith("image/") ? (
                          <img src={file.url}  alt={file.name} className="preview-img"
                               onClick={() => setFullscreenImage(file.url)} />
                       ) : (
                       <a href={file.url} target="_blank" rel="noopener noreferrer"> {file.name} </a>
                       )}
                     </div>
                    ))}
                 </div>
               </div>
              )}


              {fullscreenImage && (
                <div className="fullscreen-overlay" onClick={() => setFullscreenImage(null)}>
                  <div className="fullscreen-wrapper" onClick={(e) => e.stopPropagation()}>
                     <button className="close-btn" onClick={() => setFullscreenImage(null)}>✕</button>
                     <img src={fullscreenImage} alt="Fullscreen" className="fullscreen-img" />
                  </div>
               </div>
              )}

    </div>
  );
 }

export default TicketCard;
