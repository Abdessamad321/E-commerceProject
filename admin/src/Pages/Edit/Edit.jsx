import React, { useState, useEffect } from "react";
import "./Edit.css";
import profile from "../../Assets/MINE.jpeg";
import axios from "axios";


function Edit() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/v1/users/654b513ee2ea3950e8b90e7a"
        );
        const userData = response.data;
        console.log("user data", userData);
        setFirstname(userData.first_name);
        setLastname(userData.last_name);
        setEmail(userData.email);
        setUsername(userData.user_name);
        setPassword(userData.password);
        setRole(userData.role);
        
      } catch (error) {
        setSuccess(false)
        setError(error.message);
        
      }
    };

    fetchData();
  }, []);

  const saveChanges =async () => {
        try {
          const response = await axios.put(
            `http://localhost:7000/v1/users/654b513ee2ea3950e8b90e7a`,
            {
              first_name: firstname,
              last_name: lastname,
              user_name: username,
              password: password,
              email: email,
              role: role

            }
            
          );
          setSuccess(true)
          
          setTimeout(() => {
            setSuccess(false)
          }, 2000);
        } catch (error) {
          setError(error.message);
          setSuccess(false)
          
        }
      };

      
    
  

  return (
    <div className="edit-profile">
      
      {/* <div className="background-img">

      </div> */}
      <div className="left">
        <div className="inputs">
          <label>First Name</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="inputs">
          <label>Last Name</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="inputs">
          <label>Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <div className="inputs">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="inputs">
          <label>Password</label>
          <input
            type="text"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="inputs">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="save-button">
          <button type="submit" onClick={saveChanges}>Save</button>
        </div>
      </div>
      {/* <div className="right">
        
        <div> {success && <div style={{padding:" 20px 10px", background:" green", textAlign:" center", borderRadius:" 16px" }}>User is updated</div>}
        {error && <div style={{padding:" 20px 10px", background:" red", textAlign:" center", borderRadius:" 16px" }}>{error}</div>}</div>
      </div> */}
      <div className="image">
        <div className="pic">
          <img src={profile} alt="" />
        </div>
        <div className="edit-img">
          <p>Upload Image</p>
          <input type="file" accept=".png, .jpg, .jpeg" id="uploadImage"/>
        </div>
      </div>
    </div>
  );
}
export default Edit;
