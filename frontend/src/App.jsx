import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signin from './Signin';
import CreateAccount from './CreateAccount';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />  
        <Route path="/signin" element={<Signin />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/signin" />} />  
      </Routes>
    </BrowserRouter>
  );
};

export default App;
