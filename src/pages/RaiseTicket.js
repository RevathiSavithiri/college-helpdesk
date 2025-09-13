import React,{useState}  from "react";
import "./RaiseTicket.css";

function RaiseTicket({ addTicket }) {
    const[ticket,setTicket] = useState({
        name:"",
        email:"",
        category:"",
        description:""
    });

    const handleChange = (e) =>{
        setTicket({...ticket,[e.target.name]: e.target.value});
    };

    const handleSubmit =(e) => {
        e.preventDefault();

        addTicket({ ...ticket, status: "Open" });
         
        setTicket({
            name:"",
            email:"",
            category:"",
            description:""
        });
    };

    return(
        <div className="form-container">
            <h2>Raise a New Ticket</h2>
            <form onSubmit={handleSubmit} >
                <label>Name : </label>
                <input type="text" name="name" value={ticket.name}
                       onChange={handleChange} required />

                <label>Email : </label>    
                <input type="email" name="email" value={ticket.email}
                       onChange={handleChange} required />

                <label>Category : </label>
                <select name="category" value={ticket.category}
                        onChange={handleChange} required >
                            <option value="">Select</option>
                            <option value="admission">Admission</option>
                            <option value="exam">Exam</option>
                            <option value="fees">Fees</option>
                            <option value="hostel">Hostel</option>
                            <option value="technical">Technical</option>
                            <option value="placements">Placements</option>
                </select>

                <label>Description : </label>
                <textarea name="description" value={ticket.description}
                          onChange={handleChange} required />

                <button type="submit">Submit</button>
            </form>
        </div>
    );   
}

export default RaiseTicket; 