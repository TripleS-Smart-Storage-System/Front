import { Col, Row } from 'react-bootstrap';
import '../App.css';
import NewPageButton from '../components/NewPageButton';
import ProductList from '../components/ProductList';
import i18n from '../services/i18n';

const Products = () => (
    <div className='products'>
      <Row xs="auto" className="d-flex align-items-center">
        <Col>
          <h1>{i18n.t("Products")}</h1>
        </Col>
        <Col>
          <NewPageButton link="/products/new" text={i18n.t("Add product")} />
        </Col>
      </Row>
      <ProductList />
    </div>
);

export default Products;