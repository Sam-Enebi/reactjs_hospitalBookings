import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../config/database/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
const SignUp = () => {
  // useNavigate hook is used to navigate to different page
  const navigate = useNavigate();
  // state for user input
  const [user, setUser] = useState({
    username: "",
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
    createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password,
      user.username
    )
      .then(res => {
        // alerts success message
        alert("Account Created Successfully");
        // navigates to signin page
        navigate("/");
      })
      .catch(err => alert("Account creation failed!"));
    // if there is some error display error message
  };
  return (
    <div className='authentication'>
      <div className='authentication__box'>
        <h2 className='authentication__box__heading'>Medi - Web</h2>
        <h4 className='authentication__box__heading'>Sign Up</h4>
        <form onSubmit={submitHandler} className='authentication__box__form'>
          <label
            htmlFor='username'
            className='authentication__box__form__label'
          >
            Username
          </label>
          <input
            type='text'
            placeholder='Username'
            id='username'
            name='username'
            onChange={changeHandler}
            required
            value={user.username}
            className='authentication__box__form__input'
          />
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
              variant='contained'
              className='authentication__box__form__buttonBox__button'
              type='submit'
              onClick={submitHandler}
            >
              Sign Up
            </Button>
          </div>
        </form>
        <div className='authentication__box__registerBox'>
          <p>Already have an account?</p>
          <Link to='/signin' className='authentication__box__registerBox__link'>
            Login Now!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
