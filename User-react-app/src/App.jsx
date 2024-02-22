import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SignIn from "./components/LogInPage/SignIn";
import SignUp from "./components/LogInPage/SignUp";
import UpdatePassword from "./components/LogInPage/UpdatePassword";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/HomePage/MainPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          Start
          <Route path="/" element={<MainPage />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/updatePassword" element={<UpdatePassword />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
