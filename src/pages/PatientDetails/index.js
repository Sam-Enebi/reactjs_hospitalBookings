import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Navbar from "../../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import PatientDataService from "../../config/Services/PatientServices";

const PatientDetails = () => {
  // useNavigate hook is used to navigate to different page
  const navigate = useNavigate();
  // useLocation hook is used to get patient id sent in url
  const location = useLocation();

  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState();

  useEffect(() => {
    getPatients();
  }, []);

  // finds required patient data from array of patients when we get list of all users.
  useEffect(() => {
    if (patients.length) {
      let splitted = location.pathname.split("/");
      let _patient = splitted[splitted.length - 1];
      console.log(patients);
      let reqPatient = patients.find(p => p.id === _patient);
      console.log(reqPatient);
      setPatient({ ...reqPatient });
    }
  }, [patients]);

  const getPatients = async () => {
    // gets available patients data
    const data = await PatientDataService.getAllPatients();
    // sets in patients state so that it is displayed on screen
    setPatients(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <main className='patientDetails'>
      <Navbar />
      <section className='patientDetails__body'>
        <section className='patientDetails__body__box'>
          <h2 className='patientDetails__body__box__heading'>
            Patient Details
          </h2>
          <section className='patientDetails__body__box__contents'>
            <section>
              <h4 className='patientDetails__body__box__contents__patientName'>
                {patient?.patient?.name}
              </h4>
              <section className='patientDetails__body__box__contents__patientProfile'>
                <section className='patientDetails__body__box__contents__patientProfile__boxLeft'>
                  <span>Name: {patient?.patient?.name}</span>
                  <span>Age: {patient?.patient?.age}</span>
                </section>
                <section className='patientDetails__body__box__contents__patientProfile__boxRight'>
                  <span>Date of Birth: {patient?.patient?.dob}</span>
                  <span>Gender: {patient?.patient?.gender}</span>
                </section>
              </section>
            </section>
            <section className='patientDetails__body__box__contents__riskDetails'>
              <h4 className='patientDetails__body__box__contents__riskDetails__patientRisk'>
                Risk Profile
              </h4>
              <section className='patientDetails__body__box__contents__riskDetails__container'>
                <span>Heart Disease: 5% risk</span>
                <span>Diabetes: 10% risk</span>
                <span>Alzheimers: 10% risk</span>
              </section>
            </section>
          </section>
          <Button variant='contained' onClick={() => navigate("/")}>
            Exit
          </Button>
        </section>
      </section>
    </main>
  );
};

export default PatientDetails;
