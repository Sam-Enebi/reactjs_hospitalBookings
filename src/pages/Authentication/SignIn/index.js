import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { USER_STORAGE_KEY } from "../../../config/helpers/variables";
import { auth } from "../../../config/database/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  // useNavigate hook is used to navigate to different page
  const navigate = useNavigate();
  // state for user input
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // manages values when user types in input fields
  const changeHandler = e => {
    const { name, value } = e.target;
    // saves updated value in user state
    setUser({ ...user, [name]: value });
  };

  // Attempts to login when Login is clicked or form is submitted by hitting enter
  const submitHandler = e => {
    // avoids default behavour of submission. i.e. does not allow to reload and fill user data in url
    e.preventDefault();
    // firebase method to signIn
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then(res => {
        let data = {
          email: user.email,
        };
        // User email saved in local storage when Logged in so that we know that a specific user is logged in
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
        // alerts success message
        alert("SignIn successful!");
        // navigates to home
        navigate("/");
      })
      .catch(err => alert("Login failed!"));
    // if there is some error display error message
  };

  return (
    <div className='authentication'>
      <div className='authentication__box'>
        <h2 className='authentication__box__heading'>Medi - Web</h2>
        <h4 className='authentication__box__heading'>Sign In</h4>
        <form onSubmit={submitHandler} className='authentication__box__form'>
          <label
            htmlFor='username'
            className='authentication__box__form__label'
          >
            Email
          </label>
          <input
            type='email'
            placeholder='Email'
            id='email'
            name='email'
            onChange={changeHandler}
            required
            value={user.email}
            className='authentication__box__form__input'
          />

          <label
            htmlFor='password'
            className='authentication__box__form__label'
          >
            Password
          </label>
          <input
            type='password'
            placeholder='Password'
            id='password'
            name='password'
            onChange={changeHandler}
            required
            value={user.password}
            className='authentication__box__form__input'
          />
          <div className='authentication__box__form__buttonBox'>
            <Button
              varaint='contained'
              className='authentication__box__form__buttonBox__button'
              type='submit'
              onClick={submitHandler}
            >
              Sign In
            </Button>
          </div>
        </form>
        <div className='authentication__box__registerBox'>
          <p>Don't have an account?</p>
          <Link to='/signup' className='authentication__box__registerBox__link'>
            Register Now!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
