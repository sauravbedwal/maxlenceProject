import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInSignUpPage from './SignInSignUpPage';
import Home from './Home';
import SignUpPage from './SignUpPage';
import RegistrationForm from './RegistrationForm';
import ResetPassword from './ResetPassword';
// check
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/signin" element={<SignInSignUpPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
