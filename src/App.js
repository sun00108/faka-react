import React, {Fragment} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home'

import AuthLogin from './pages/auth/login'

import AdminAuthLogin from "./pages/admin/auth/login";
import AdminAuthRegister from "./pages/admin/auth/register";

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/auth/login'} element={<AuthLogin />} />
            <Route path={'/admin/auth/login'} element={<AdminAuthLogin />} />
            <Route path={'/admin/auth/register'} element={<AdminAuthRegister />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
