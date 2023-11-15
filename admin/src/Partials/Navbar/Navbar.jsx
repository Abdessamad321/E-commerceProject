// import React, { useState } from "react";
// import "./Navbar.css";
// import SearchIcon from '@mui/icons-material/Search';
// import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
// import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
// const Navbar = () => {
//   const [searchValue, setSearchValue] = useState('');
//   const [isIconVisible, setIconVisibility] = useState(true);
//   const titleChange = ()=>{
    
//   }
//   const handleInputChange = (event) => {
//     setSearchValue(event.target.value);
//   };
//   const handleIconClick = () => {
//     console.log('Searching for:', searchValue);
//     setIconVisibility(false);
//   };
//   const logOutHandler = (e) => {
//     e.redirect('/logout')
//   };
//   return (
//     <div className="navbar">
//       <label onChange={titleChange} className="title" htmlFor="">Statistics</label>
//       <div className="search">
//       {isIconVisible && <SearchIcon onClick={handleIconClick} className="search-icon" />}
//       <input
//         type="text"
//         placeholder="Search something..."
//         className="search-input"
//         value={searchValue}
//         onChange={handleInputChange}
//       />
//     </div>
//       <div className="right-buttons">
//       <button className="notifications" type="button">
//       <NotificationsNoneRoundedIcon/>
//         </button>
//       <button className="logout" type="Logout" onClick={(e) => logOutHandler(e)}>
//         <LogoutRoundedIcon/>
//       </button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import "./Navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import React, { useState } from "react";


const Navbar = ({ handleSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleIconClick = () => {
    handleSearch(searchValue);
  };
 
  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch(searchValue);
    }
  };
  const logOutHandler = (e) => {
        e.redirect('/logout')
      };
  return (
    <div className="navbar">
      {/* <label className="title" htmlFor="">Statistics</label> */}
      <form className="search" onSubmit={(e) => e.preventDefault()}>
        <SearchIcon onClick={handleIconClick} className="search-icon" />
        <input
          type="text"
          placeholder="Search something..."
          className="search-input"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
      </form>
    {/* </div> */}
      <div className="right-buttons">
        <button className="notifications" type="button">
          <NotificationsNoneRoundedIcon/>
        </button>
        <button className="logout" type="button" onClick={logOutHandler}>
          <LogoutRoundedIcon/>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
