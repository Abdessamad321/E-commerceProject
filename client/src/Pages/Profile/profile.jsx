import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
// import { Button } from "react-bootstrap";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Components/Logincontext/Logincontext";
import "./Profile.css";

function Profil() {
  const authContext = useContext(AuthContext);
  const handleLogout = authContext.logout;
  const [customer, setCustomer] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    new_password: "",
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
        const customerData = response.data;
        setCustomer({
          first_name: customerData.first_name,
          last_name: customerData.last_name,
          email: customerData.email,
          customer_image: customerData.customer_image || null,
        });
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      customer_image: file,
    }));
    authContext.setCustomerImageHandler(file);
  };

  const saveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append("first_name", customer.first_name);
      formData.append("last_name", customer.last_name);
      formData.append("email", customer.email);
      if (customer.customer_image) {
        formData.append("customer_image", customer.customer_image);
      }
      formData.append("old_password", customer.password);
      formData.append("new_password", customer.new_password);

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
      <div className="contone">
        <div
          style={{
            border: "solid #fff",
            margin: "2%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            overflow: "hidden",
            backgroundColor: "#f9e9c8",
            position: "relative",
          }}
        >
          {customer.customer_image ? (
            <img
              src={
                customer.customer_image instanceof File
                  ? URL.createObjectURL(customer.customer_image)
                  : customer.customer_image
              }
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                cursor: "pointer",
                position: "absolute",
              }}
              onClick={() => document.getElementById("image-input").click()}
            />
          ) : (
            <img style={{ width: "100%", height: "100%" }} src="" alt="" />
          )}
          <input
            type="file"
            id="image-input"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
              cursor: "pointer",
            }}
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div>
          <div className="inputs">
            <label>First Name</label>
            <input
              type="text"
              value={customer.first_name}
              onChange={(e) =>
                setCustomer({ ...customer, first_name: e.target.value })
              }
            />
          </div>
          <div className="inputs">
            <label>Last Name</label>
            <input
              type="text"
              value={customer.last_name}
              onChange={(e) =>
                setCustomer({ ...customer, last_name: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <div className="inputs">
            <label>Email</label>
            <input
              type="text"
              value={customer.email}
              onChange={(e) =>
                setCustomer({ ...customer, email: e.target.value })
              }
            />
          </div>
          <div className="inputs">
            <label>Password</label>
            <input
              type="password"
              value={customer.password}
              onChange={(e) =>
                setCustomer({ ...customer, password: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <div className="inputs">
            <label>New Password</label>
            <input
              type="password"
              value={customer.new_password}
              onChange={(e) =>
                setCustomer({ ...customer, new_password: e.target.value })
              }
            />
          </div>

          <div className="inputs">
            <div className="save-button">
              <Button
                style={{
                  cursor: "pointer",
                  backgroundColor: "#590404",
                  color: "#fff",
                }}
                type="submit"
                onClick={saveChanges}
              >
                Save
              </Button>
              <Button
                style={{
                  cursor: "pointer",
                  backgroundColor: "#590404",
                  color: "#fff",
                }}
                // type="submit"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profil;
