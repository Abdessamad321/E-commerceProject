import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../../../admin/src/AuthContext";
import './Profile.css'

function Profil() {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: '',
    confirmPassword: '',
    customer_image: null,
  });

  const [customerId, setCustomerId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const storedCustomerId = localStorage.getItem("customerId");
      setCustomerId(storedCustomerId);
      try {
        const response = await axios.get(
          `http://localhost:7000/v1/customers/${storedCustomerId}`
        );
        const userData = response.data;
        setUser({
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          customer_image: userData.customer_image || null,
        });
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUser((prevUser) => ({
      ...prevUser,
      customer_image: file,
    }));
    authContext.setUserImage(file);
  };

  const saveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("first_name", user.first_name);
      formData.append("last_name", user.last_name);
      formData.append("email", uwser.email);
      if (user.customer_image) {
        formData.append("customer_image", user.customer_image);
      }
      formData.append("password", user.password);
      formData.append("confirmPassword", user.confirmPassword);

      const response = await axios.patch(
        `http://localhost:7000/v1/customers/update/${customerId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data);
    } catch (error) {
      toast.error("Couldn't update customer", { error });
    }
  };

  return (
    <div className="edit-profile">
      <div style={{
        border: 'solid var(--background2)',
        margin: '2%',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        overflow: 'hidden',
        backgroundColor: '#ccc',
        position: 'relative'
      }}>
        {user.customer_image ? (
          <img
            src={user.customer_image instanceof File ? URL.createObjectURL(user.customer_image) : (user.customer_image)}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              cursor: 'pointer',
              position: 'absolute'
            }} onClick={() => document.getElementById('image-input').click()} />
        ) : (
          <img style={{ width: "100%", height: '100%' }} src='' alt="" />
        )}
        <input
          type="file"
          id="image-input"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer'
          }}
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <div className="inputs">
        <label>First Name</label>
        <input
          type="text"
          value={user.first_name}
          onChange={(e) => setUser({ ...user, first_name: e.target.value })}
        />
      </div>
      <div className="inputs">
        <label>Last Name</label>
        <input
          type="text"
          value={user.last_name}
          onChange={(e) => setUser({ ...user, last_name: e.target.value })}
        />
      </div>
      <div className="inputs">
        <label>Password</label>
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <div className="inputs">
        <label>Confirm Password</label>
        <input
          type="password"
          value={user.confirmPassword}
          onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
        />
      </div>
      <div className="inputs">
        <label>Email</label>
        <input
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <div className="save-button">
        <Button type="submit" onClick={saveChanges}>Save</Button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profil;
