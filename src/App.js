import React, {Fragment} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home'

import AuthLogin from './pages/auth/login'

import OrderIndex from './pages/order/index'
import OrderInfo from './pages/order/info'
import OrderInfoGuest from './pages/order/infoGuest'

import AdminHome from './pages/admin/home'
import AdminProductHome from "./pages/admin/product";
import AdminHomeContent from "./pages/admin/homeContent";
import AdminOrderHome from "./pages/admin/order";

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/auth/login'} element={<AuthLogin />} />
            <Route path={'/order'} element={<OrderIndex />} />
            <Route path={'/order/:id'} element={<OrderInfo />} />
            <Route path={'/order/guest/:code'} element={<OrderInfoGuest />} />
            <Route path={'/admin'} element={<AdminHome />}>
                <Route path={''} element={<AdminHomeContent />} />
                <Route path={'product'} element={<AdminProductHome />} />
                <Route path={'order'} element={<AdminOrderHome />} />
            </Route>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
