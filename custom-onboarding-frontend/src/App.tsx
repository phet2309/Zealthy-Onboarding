import React from "react";
import { Route, Routes } from "react-router";
import Data from "./pages/Data";
import AdminPage from "./pages/AdminPage";
import PrivateRoute from "./components/PrivateRoute";
import UserOnboardForm from "./pages/UserOnboardFormPage";
import UserOnboardAuth from "./pages/UserOnboardAuth";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
  return (

    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-onboard-auth" element={<UserOnboardAuth />} />
        <Route path="/user-onboard-form" element={<PrivateRoute element={<UserOnboardForm />} />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/data" element={<Data />} />
      </Routes>
      
    </>

  );
}

export default App;
