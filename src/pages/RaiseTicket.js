import React, { useState } from "react";
import "./RaiseTicket.css";

function RaiseTicket({ addTicket }) {
  const [ticket, setTicket] = useState({
    name: "",
    email: "",
    category: "",
    description: "",
  });

  const [attachments, setAttachments] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
  const files = Array.from(e.target.files);

  const newFiles = files.map((file) => ({
    name: file.name,
    type: file.type,
    url: URL.createObjectURL(file), 
  }));

  setAttachments((prev) => [...prev, ...newFiles]);
  e.target.value = null; 
  };

  const handleRemoveFile = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ticketData = {
      ...ticket,
      attachments,
    };

    addTicket(ticketData);

    setTicket({
      name: "",
      email: "",
      category: "",
      description: "",
    });
    setAttachments([]);
  };

  return (
    <div className="form-container">
      <h2>Raise a New Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label>Name : </label>
        <input type="text" name="name" value={ticket.name} onChange={handleChange} required />

        <label>Email : </label>
        <input type="email" name="email" value={ticket.email} onChange={handleChange} required />

        <label>Category : </label>
        <select name="category" value={ticket.category} onChange={handleChange} required >
          <option value="">Select</option>
          <option value="admission">Admission</option>
          <option value="exam">Exam</option>
          <option value="fees">Fees</option>
          <option value="hostel">Hostel</option>
          <option value="technical">Technical</option>
          <option value="placements">Placements</option>
        </select>

        <label>Description : </label>
        <textarea name="description" value={ticket.description} onChange={handleChange} required />

        <label>Attachments (Image/PDF) :</label>
        <input type="file" id="fileInput" accept="image/*,application/pdf" multiple onChange={handleFileChange} />

        <div className="file-preview">
           {attachments.map((file, idx) => (
             <div key={idx} className="preview-item">
                {file.type.startsWith("image/") ? (
                  <img src={file.url} alt="preview" className="preview-img" />
                ) : (
                <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png" alt="File icon" className="file-icon" />
                )}
                <p className="file-name">{file.name}</p>
                <button type="button" className="r-btn" onClick={() => handleRemoveFile(idx)}> ❌ </button>
             </div>
           ))}
        </div>

         <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RaiseTicket;
