import React, {Fragment} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home'

import ProductIndex from './pages/product/index'

import AdminAuthLogin from "./pages/admin/auth/login";
import AdminAuthRegister from "./pages/admin/auth/register";

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/products'} element={<ProductIndex />} />
            <Route path={'/admin/auth/login'} element={<AdminAuthLogin />} />
            <Route path={'/admin/auth/register'} element={<AdminAuthRegister />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
