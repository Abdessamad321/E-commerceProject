import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Form, Button, Modal, Table } from 'react-bootstrap';
import FilterListIcon from '@mui/icons-material/FilterList';
import { ClipLoader } from 'react-spinners';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Users.css';
import PreviewIcon from '@mui/icons-material/Preview';
import Navbar from '../../Partials/Navbar/Navbar';


//for the regester form ======================================
const CreateUser = ({ createShow, handleClose, handleCreate }) => {
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    realEmail: '',
    realPass: '',
    isAdmin: false,
    isManager: false,
  });  

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'radio') {
      setNewUser((prevData) => ({
        ...prevData,
        isAdmin: name === 'role' && value === 'admin',
        isManager: name === 'role' && value === 'manager',
      }));
    } else {
      setNewUser((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, userName, realEmail, realPass, isAdmin, isManager } = newUser;
    handleCreate({ first_name: firstName, last_name: lastName, user_name: userName, email: realEmail, password: realPass, role: isAdmin ? 'admin' : isManager ? 'manager' : '' });
};

  return(
  <Modal show={createShow} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Create user</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter first name"
          name="firstName"
          value={newUser.firstName}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter last name"
          name="lastName"
          value={newUser.lastName}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formUserName">
        <Form.Label>User Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter user name"
          name="userName"
          value={newUser.userName}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="realEmail"
          value={newUser.realEmail}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Password"
          name="realPass"
          value={newUser.realPass}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group controlId="formRole">
      <Form.Label>Role</Form.Label>
        <div className='radios'>
        <Form.Check
                type="radio"
                label="Admin"
                name="role"
                value="admin"
                checked={newUser.isAdmin}
                onChange={handleInputChange}
                id="adminRole"
              />
              <Form.Check
                type="radio"
                label="Manager"
                name="role"
                value="manager"
                checked={newUser.isManager}
                onChange={handleInputChange}
                id="managerRole"
              />
        </div>
      </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer className='Modal-Footer'>
      <Button className='savebtn' onClick={handleSubmit}>
        Create
      </Button>
    </Modal.Footer>
  </Modal>
);
}

// for the update form =======================================
const UpdateUserForm = ({ user, handleUpdate, show, handleClose }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    user_name: '',
    email: '',
    isAdmin: false,   
    isManager: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        user_name: user.user_name || '',
        email: user.email || '',
        isAdmin: user.role === 'admin',    
        isManager: user.role === 'manager',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(formData, user._id);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formUserName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user name"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formRole">
        <Form.Label>Role</Form.Label>
          <div>
            <Form.Check
              type="radio"
              label="Admin"
              name="role"
              value="admin"
              checked={formData.role === 'admin'}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              label="Manager"
              name="role"
              value="manager"
              checked={formData.role === 'manager'}
              onChange={handleChange}
            />
          </div>
        </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className='Modal-Footer'>
        <Button className='savebtn' onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [show, setShow] = useState(false);  
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [view, setView] = useState(null);

  const Close = () => setView(false);
  const views = () => setView(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/v1/allUsers?page=${currentPage}&perPage=${itemsPerPage}`);
      const data = response.data;
      setUsers(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render the list of users
  // const renderUsers = users.map((user) => (
  //   <div key={user.id}>{user.name}</div>
  // ));

  // Calculate total number of pages
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const removeUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:7000/v1/users/${userId}`);
      if (response.status === 200) {
        const updatedUsers = users.filter((user) => user._id !== userId);
        setUsers(updatedUsers);
        setSuccess('User deleted successfully');
      } else {
        setError("Failed to delete user");
      }
    } catch (error) {
      setError("Error deleting user:", error);
    } finally {
      setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 1000);
    }
  };


  const viewUser = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:7000/v1/users/${userId}`);
      if (response.status === 200) {
        const user = response.data;
      setUserData(user); // Set user data in the state
      views();
      }// Show the modal
    } catch (error) {
      setError("Error viewing user:", error);
    }finally{
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  const handleUpdate = async (updatedData, userId) => {
    try {
      const response = await axios.put(`http://localhost:7000/v1/users/${userId}`, updatedData);

      if (response.status === 200) {
        const updatedUserList = users.map((user) =>
          user._id === userId ? { ...user, ...updatedData } : user
        );
        setUsers(updatedUserList);
        setSuccess('User updated successfully');
      } else {
        setError('Failed to update user');
      }
    } catch (error) {
      setError('Error updating user:', error);
    } finally {
      handleClose();
      clearMessages();
    }
  };

  const clearMessages = () => {
    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 2000);
  };

  const handleShow = (user) => {
    setSelectedUser(user);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedUser(null);
    setCreateModalVisible(false)
  };
  // for creation =====

  const handleCreate = async (newUser) => {
    try {
      const response = await axios.post('http://localhost:7000/v1/users', newUser);
      if (response.status === 201) {
        setSuccess('New User created successfully');
        fetchData();  
      } else {
        setError(`Error creating a new user: ${response.data.err}`);
      }
    } catch (error) {
      setError(`Error creating a new user: ${error.message}`);
    } finally {
      handleClose();
      clearMessages();
    }
  };
  
  const ShowCreate = () => {
    // setNewUser({ 
    //   firstName: '',
    //   lastName: '',
    //   userName: '',
    //   realEmail: '',
    //   realPass: '',
    //   isAdmin: false,
    //   isManager: false,
    // });
    setCreateModalVisible(true);
  };
  
  //for sortinggggggg===================
  const [sortOrder, setSortOrder] = useState(null);

  const handleSortClick = async () => {
    try {
      const newSortOrder = sortOrder === 'DESC' ? 'ASC' : 'DESC';
      const response = await axios.get('http://localhost:7000/v1/users/sortedBy', {
        params: {
          sort: newSortOrder,
        },
      });
      const data = response.data;
      setUsers(data);
      setSortOrder(newSortOrder);
  
    } catch (error) {
      setError(`Error sorting users: ${error.message}`);
    }
  };
  // for searchingggggggggggg============================


  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = async (value) => {
    setSearchValue(value);

    try {
      setLoading(true);
      if (value.trim() === '') {
        fetchData();
        setSearchResults([]); 
      } else {
      const response = await axios.get('http://localhost:7000/v1/use', {
        params: {
          query: value,
        },
      });
      const results = response.data;
      if (results.length === 0) {
        setError('No users found with the given name.');
      } else {
        setSearchResults(results);
        setError(null);
      }
    }
    
    } catch (error) {
      setError(`Error searching users: ${error.message}`);
    } finally {
      setLoading(false);
      setTimeout(() => {
      setError(null);
    }, 2000);
    }
  };
  useEffect(() => {
    setUsers(searchResults);
  }, [searchResults]);
  
  return (
    <>
      <div className="custom-table">
        <div className="top">
          <h1>Users List</h1>
          <div style={{ display: 'flex', width: '80px', justifyContent: 'space-between' }}>
            <GroupAddOutlinedIcon className='addUser' onClick={ShowCreate} style={{ cursor: 'pointer'}} />
            <FilterListIcon onClick={handleSortClick} style={{ cursor: 'pointer'}}/>
          </div>
        </div>
        {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner">
              <ClipLoader color="#fff" loading={loading} size={50} />
            </div>
          </div>
        )}
          {success && (
            <div className='success'>
              <div className='successmsg' style={{ marginBottom: '20px', padding: '20px', borderRadius: '8px', background: 'green' }}>
                {success}
              </div>
            </div>
          )}
        {error && (
          <div className='errore'>
            <div className='erroremsg' style={{ marginBottom: '20px', padding: '20px', borderRadius: '8px', background: 'red' }}>
              {error}
            </div>
          </div>
        )}
        <div className="ttable">
          <Table striped hover style={{border:'0px solid inherit'}}>
            <thead>
              <tr>
                <th style={{ borderTopLeftRadius: '8px' }}>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Update</th>
                <th>Remove</th>
                <th style={{ borderTopRightRadius: '8px' }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {users
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((user) => (
                  <tr key={user._id}>
                    <td className="align-middle">{user.first_name}</td>
                    <td className="align-middle">{user.last_name}</td>
                    <td className="align-middle">{user.email}</td>
                    <td className="align-middle">{user.role}</td>
                    <td>
                      <Button onClick={() => handleShow(user)} className="update" style={{ width: '100%' }} variant="success">
                        <ManageAccountsOutlinedIcon />
                      </Button>
                    </td>
                    <td>
                      <Button className="remove" style={{ width: '100%' }} variant="danger" onClick={() => removeUser(user._id)}>
                        <PersonRemoveIcon />
                      </Button>
                    </td>
                    <td>
                      <Button className="align-middle" style={{ width: '100%' }} variant="secondary" onClick={() => viewUser(user._id)}>
                        <PreviewIcon />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        <div className='pagination'>
          {users.length > itemsPerPage && (
            <div style={{textAlign:'center'}}>
              <span className='pages'>Page:</span>
              {Array.from({ length: Math.ceil(users.length / itemsPerPage) }, (_, index) => (
                <Button  
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  style={{background:'rgba(0, 0, 0, 0.1)',cursor: 'pointer',margin: '0 2px',border: currentPage === index + 1 ? '2px solid var(--background1)' : 'none', padding:'5px 15px'}}>
                  {index + 1}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
      <Modal show={view} onHide={Close}>
        <Modal.Header closeButton>
          <Modal.Title>All user's infos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {userData && (
          <div>
            <p>firstName: {userData.first_name}</p>
            <p>lastName: {userData.last_name}</p>
            <p>userName: {userData.user_name}</p>
            <p>Email: {userData.email}</p>
            <p>Role: {userData.role}</p>
            <p>active: {userData.active === true ? <span style={{color:'green'}}>true</span> : <span style={{color:'red'}}>false</span>}</p>
            <p>create date: {(userData.createdAt).split('T')[0]}</p>
            <p>updated date: {(userData.updatedAt).split('T')[0]}</p>
          </div>
        )}
        </Modal.Body>
        <Modal.Footer className='Modal-Footer'>
          <Button className='savebtn' onClick={Close}>
            Close
          </Button>
        </Modal.Footer>
        </Modal>
      <UpdateUserForm
        user={selectedUser}
        show={show}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
      />
      <CreateUser
        createShow={isCreateModalVisible}
        handleClose={handleClose}
        handleCreate={handleCreate}
      />
        <Navbar handleSearch={handleSearch} searchValue={searchValue}  />
    </>
  );
  
  
}

export default UsersList;
