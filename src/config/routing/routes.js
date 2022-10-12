import AddPatient from "../../pages/AddPatient";
import SignIn from "../../pages/Authetication/Signin";
import SignUp from "../../pages/Authetication/SignUp";
import PatientDetails from "../../pages/PatientDetails";
import Patients from "../../pages/Patients";

// All routes and their details
// isPrivate shows if these routes should be private or public to anyone.
// Private routes can only be accessed when logged in
const routes = [
  {
    name: "Sign In",
    path: "/signin",
    component: SignIn,
    isPrivate: false,
  },
  {
    name: "Sign Up",
    path: "/signup",
    component: SignUp,
    isPrivate: false,
  },
  {
    name: "Patients",
    path: "/",
    component: Patients,
    isPrivate: true,
  },
  {
    name: "Patient Details",
    path: "/patientdetails/:_patient",
    component: PatientDetails,
    isPrivate: true,
  },
  {
    name: "Add Patient",
    path: "/addpatient",
    component: AddPatient,
    isPrivate: true,
  },
];

export default routes;
