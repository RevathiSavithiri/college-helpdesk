import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import "./Login.css";

function Login({setUser}) {
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {

    if(username === "admin" && password === "@dmin123"){
        setUser({role : "admin" , name:"Admin"});
        navigate("/admin");
    }else if(username && password) {
        setUser({role:"student" , name: username });
        navigate("/home")
    }else {
       alert("Invalid credentials");
    }
    };


return(
    <div className="login-page">
      <h1 className="clg-name">RP College Helpdesk Portal</h1>
      <div className="login-container">
       
        <h2>Login</h2>
            <input type='text' placeholder="Enter your name" value={username}
                   onChange={(e)=>setUsername(e.target.value)} />
            
            <input type="password" placeholder="Enter your password" value={password}
                   onChange={(e)=>setPassword(e.target.value)} />
            
            <button onClick={handleLogin}>Login</button>
      </div>
   </div>
);
}

export default Login ;