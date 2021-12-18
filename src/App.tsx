import './App.css';
import { Route, Routes } from 'react-router-dom';
import { BadRequest, Unauthorized, AccessDenied, PageNotFound } from './pages/ErrorPages';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import Product from './pages/Product'
import NewProduct from './pages/NewProduct'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ChangeRole from './pages/Roles'
import EditProduct from './pages/EditProduct';
import Users from './pages/Users';
import EditUser from './pages/EditUser';
import Logout from './pages/Logout';
import Supplies from './pages/Supplies';
import NewSupplyOrder from './pages/NewSupplyOrder';
import EditSupplyOrder from './pages/EditSupplyOrder';
import Warehouses from './pages/Warehouses';
import NewWarehouse from './pages/NewWarehouse';
import Relocation from './pages/Relocation';
import Warehouse from './pages/Warehouse';
import Statistics from './pages/Statistics';

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
      <Route path='/users/roles/edit/:id' element={<ChangeRole />} />
      <Route path='/products' element={<Products />}/>
      <Route path='/products/new' element={<NewProduct />}/>
      <Route path='/products/edit/:id' element={<EditProduct />}/>
      <Route path='/products/:id' element={<Product />}/>
      <Route path='/supplies' element={<Supplies />}/>
      <Route path='/supplies/new' element={<NewSupplyOrder />}/>
      <Route path='/supplies/edit/:id' element={<EditSupplyOrder />}/>
      <Route path='/warehouses' element={<Warehouses />}/>
      <Route path='/warehouses/:id' element={<Warehouse />}/>
      <Route path='/warehouses/new' element={<NewWarehouse />}/>
      <Route path='/relocation' element={<Relocation />}/>
      <Route path='/statistics' element={<Statistics />}/>
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
