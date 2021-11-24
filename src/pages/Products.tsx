import { Col, Row } from 'react-bootstrap';
import '../App.css';
import NewPageButton from '../components/NewPageButton';
import ProductList from '../components/ProductList';

const Products = () => (
    <div className='products'>
      <Row xs="auto" className="d-flex align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col>
          <NewPageButton link="/products/new" text="Add product" />
        </Col>
      </Row>
      <ProductList />
    </div>
);

export default Products;