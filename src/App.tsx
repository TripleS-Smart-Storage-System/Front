import './App.css';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { removeUserSession } from './Utils/Common';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import Product from './pages/Product'
import NewProduct from './pages/NewProduct'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import EditProduct from './pages/EditProduct';
import Users from './pages/Users';
import EditUser from './pages/EditUser';
import { BadRequest, Unauthorized, AccessDenied, PageNotFound } from './pages/ErrorPages';
import Logout from './pages/Logout';

const App = () => (
  <div className="app">
    <Header />
    <Main />
    <Footer />
  </div>
);

const Main = () => (
  <div className="main">
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/users' element={<Users />}/>
      <Route path='/users/edit/:id' element={<EditUser />}/>
      <Route path='/products' element={<Products />}/>
      <Route path='/products/new' element={<NewProduct />}/>
      <Route path='/products/edit/:id' element={<EditProduct />}/>
      <Route path='/products/:id' element={<Product />}/>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/403' element={<AccessDenied />} />
      <Route path='/401' element={<Unauthorized />} />
      <Route path='/400' element={<BadRequest />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  </div>
);

export default App;
