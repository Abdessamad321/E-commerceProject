import React, { useState } from "react";
import "./Navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
const Navbar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isIconVisible, setIconVisibility] = useState(true);
  const titleChange = ()=>{
    
  }
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };
  const handleIconClick = () => {
    console.log('Searching for:', searchValue);
    setIconVisibility(false);
  };
  const logOutHandler = (e) => {
    e.redirect('/logout')
  };
  return (
    <div className="navbar">
      <label onChange={titleChange} className="title" htmlFor="">Statistics</label>
      <div className="search">
      {isIconVisible && <SearchIcon onClick={handleIconClick} className="search-icon" />}
      <input
        type="text"
        placeholder="Search something..."
        className="search-input"
        value={searchValue}
        onChange={handleInputChange}
      />
    </div>
      <div className="right-buttons">
      <button className="notifications" type="button">
      <NotificationsNoneRoundedIcon/>
        </button>
      <button className="logout" type="Logout" onClick={(e) => logOutHandler(e)}>
        <LogoutRoundedIcon/>
      </button>
      </div>
    </div>
  );
};

export default Navbar;
