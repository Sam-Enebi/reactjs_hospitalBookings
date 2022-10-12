import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Navbar from "../../components/Navbar";
import PatientDataService from "../../config/Services/PatientServices";
import { useNavigate } from "react-router-dom";

const AddPatient = () => {
  // useNavigate hook is used to navigate to different page
  const navigate = useNavigate();
  // state for patient data
  const [patient, setPatient] = useState({
    name: "",
    dob: "",
    gender: "",
    age: "",
  });

  // manages values when user types in input fields
  const changeHandler = e => {
    const { name, value } = e.target;
    // saves updated value in patient state
    setPatient({ ...patient, [name]: value });
  };

  useEffect(() => {
    // console.log({ ...patient })
  }, [patient]);

  // Attempts to login when Login is clicked or form is submitted by hitting enter
  const submitHandler = async e => {
    // avoids default behavour of submission. i.e. does not allow to reload and fill user data in url
    e.preventDefault();
    const newPatient = {
      patient,
    };
    // console.log(newPatient);
    try {
      // firebase service to add patient
      await PatientDataService.addPatients(newPatient);
      // alerts success message
      alert("Patient added successfuly");
      // Navigates to home after adding patient
      navigate("/");
    } catch (err) {}
  };

  return (
    <main className='addPatient'>
      <Navbar />
      <section className='addPatient__body'>
        <section className='addPatient__body__box'>
          <h2 className='addPatient__body__box__heading'>Add Patient</h2>
          <section className='addPatient__body__box__formContainer'>
            <form
              onSubmit={submitHandler}
              className='addPatient__body__box__formContainer__form'
            >
              <label
                htmlFor='name'
                className='addPatient__body__box__formContainer__form__label'
              >
                Name
              </label>
              <input
                type='text'
                placeholder='Name'
                id='name'
                name='name'
                onChange={changeHandler}
                required
                value={patient.name}
                className='addPatient__body__box__formContainer__form__input'
              />
              <label
                htmlFor='dob'
                className='addPatient__body__box__formContainer__form__label'
              >
                Date of Birth
              </label>
              <input
                type='date'
                placeholder='Date of Birth'
                id='dob'
                name='dob'
                onChange={changeHandler}
                required
                value={patient.dob}
                className='addPatient__body__box__formContainer__form__input'
              />
              <label
                htmlFor='gender'
                className='addPatient__body__box__formContainer__form__label'
              >
                Gender
              </label>
              <select
                id='gender'
                name='gender'
                onChange={changeHandler}
                required
                value={patient.gender}
                className='addPatient__body__box__formContainer__form__input'
              >
                <option>--Select--</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
              <label
                htmlFor='age'
                className='addPatient__body__box__formContainer__form__label'
              >
                Age
              </label>
              <input
                type='number'
                placeholder='Age'
                id='age'
                name='age'
                onChange={changeHandler}
                required
                value={patient.age}
                className='addPatient__body__box__formContainer__form__input'
              />
              <div className='addPatient__body__box__formContainer__form__buttonBox'>
                <Button
                  varaint='contained'
                  type='submit'
                  className='addPatient__body__box__formContainer__form__buttonBox__button'
                >
                  Add Patient
                </Button>
              </div>
            </form>
          </section>
          <section className='addPatient__body__box__buttons'>
            <Button variant='contained' onClick={() => navigate("/")}>
              Exit
            </Button>
          </section>
        </section>
      </section>
    </main>
  );
};

export default AddPatient;
