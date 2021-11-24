import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import Home from './pages/Home'
import Products from './pages/Products'
import Product from './pages/Product'
import NewProduct from './pages/NewProduct'
import SignUp from './pages/SignUp'
import EditProduct from './pages/EditProduct';

const App = () => (
  <div className="app">
    <Header />
    <Main />
    <Footer />
  </div>
);

const Footer = () => (
  <div className="footer">
    <div className="text-info">Copyright © 2021 TripleS - Smart Storage System</div>
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
  <div className="main">
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<Products />}/>
      <Route path='/products/new' element={<NewProduct />}/>
      <Route path='/products/edit/:id' element={<EditProduct />}/>
      <Route path='/products/:id' element={<Product />}/>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/403' element={<AccessDenied />} />
      <Route path='/400' element={<BadRequest />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  </div>
);

export default App;
