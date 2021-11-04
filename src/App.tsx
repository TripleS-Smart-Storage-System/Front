import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header'
import Home from './pages/Home'
import Products from './pages/Products'
import SignUp from './pages/SignUp'

const App = () => (
  <div className="app">
    <Header />
    <div className="main">
      <Main />
    </div>
  </div>
);

const PageNotFound = () => (
  <div className="page-not-found">
    <div className="text-center py-5">
      <h1 className="display-1">404</h1>
      <h2>Page not found</h2>
    </div>
  </div>
);

const AccessDenied = () => (
  <div className="page-not-found">
    <div className="text-center py-5">
      <h1 className="display-1">403</h1>
      <h2>Access Denied</h2>
    </div>
  </div>
);

const BadRequest = () => (
  <div className="page-not-found">
    <div className="text-center py-5">
      <h1 className="display-1">400</h1>
      <h2>Bad Request</h2>
    </div>
  </div>
);

const Main = () => (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<Products />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/403' element={<AccessDenied />} />
      <Route path='/400' element={<BadRequest />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
);

export default App;
