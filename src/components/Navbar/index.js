import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { USER_STORAGE_KEY } from "../../config/helpers/variables";

const Navbar = () => {
  const navigate = useNavigate();

  // Logs out user
  const logout = () => {
    // removes user details from localstorage
    localStorage.removeItem(USER_STORAGE_KEY);
    // navigates to signin page
    navigate("/signin");
  };

  return (
    <div>
      <header className='navbar'>
        <h3 className='navbar__pageName'>Medi - Web</h3>
        <Button
          variant='contained'
          className='navbar__logoutButton'
          onClick={logout}
        >
          Logout
        </Button>
      </header>
    </div>
  );
};

export default Navbar;
