import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Button } from "@mui/material";
import PatientDataService from "../../config/Services/PatientServices";
import { useNavigate } from "react-router-dom";

const Patients = () => {
  // useNavigate hook is used to navigate to different page
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = async () => {
    // gets available patients data
    const data = await PatientDataService.getAllPatients();
    console.log(Array.isArray(data?.docs));
    // sets in patients state so that it is displayed on screen
    setPatients([...data?.docs?.map(doc => ({ ...doc.data(), id: doc.id }))]);
    // sets loading to false after we get all data
    setLoading(false);
  };

  const deleteHandler = async id => {
    // Takes patient id and deletes it from firestore
    await PatientDataService.deletePatient(id);
    // after deletion removes it from patients state/screen
    let filtered = patients.filter(p => p.id !== id);
    setPatients([...filtered]);
  };

  const exportData = patient => {
    // Download Patient details in CSV
    const headings = [
      "Name",
      "Gender",
      "DOB",
      "Age",
      "Heart Disease",
      "Diabetes",
      "Alzheimers",
    ];
    let fileText = "";
    headings.forEach(head => {
      fileText = fileText.concat(`${head},`);
    });

    fileText = fileText.concat("\n");

    console.log(patient.patient.name);
    fileText = fileText.concat(
      `${patient.patient.name},${patient.patient.gender},${patient.patient.dob},${patient.patient.age},50% Risk,10% Risk,12% Risk`
    );

    // return console.log(fileText);
    var a = document.createElement("a");
    var file = new Blob([fileText], {
      type: "csv",
    });
    a.href = URL.createObjectURL(file);
    a.download = `${patient.patient.name}.csv`;
    a.click();
  };

  return (
    <main className='patients'>
      <Navbar />
      <section className='patients__body'>
        <section className='patients__body__box'>
          {/* If loading and getting data display loader otherwise display patients */}
          {loading ? (
            <div className='centered'>
              <h3>Loading...</h3>
            </div>
          ) : (
            <>
              <h2 className='patients__body__box__heading'>Patients</h2>
              <section className='patients__body__box__addPatient'>
                <Link to='/addpatient' style={{ textDecoration: "none" }}>
                  <Button variant='contained'>Add Patient</Button>
                </Link>
              </section>
              {patients.length ? (
                patients.map(doc => {
                  return (
                    <section
                      className='patients__body__box__contents'
                      key={doc?.id}
                    >
                      <p>{doc?.patient?.name}</p>
                      <section className='patients__body__box__contents__buttons'>
                        <Button
                          variant='contained'
                          onClick={() => exportData(doc)}
                        >
                          Export
                        </Button>
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={() => navigate(`/patientdetails/${doc.id}`)}
                        >
                          View
                        </Button>
                        <Button
                          variant='contained'
                          color='error'
                          onClick={e => deleteHandler(doc.id)}
                        >
                          Delete
                        </Button>
                      </section>
                    </section>
                  );
                })
              ) : (
                <div className='centered'>
                  <h1>No Patient Data!</h1>
                </div>
              )}
            </>
          )}
        </section>
      </section>
    </main>
  );
};

export default Patients;
