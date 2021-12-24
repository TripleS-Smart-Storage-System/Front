import { Col, Row } from 'react-bootstrap';
import '../App.css';
import NewPageButton from '../components/NewPageButton';
import WarehouseList from '../components/WarehouseList';
import i18n from '../services/i18n';

const Warehouses = () => (
    <div className='warehouses'>
      <Row xs="auto" className="d-flex align-items-center">
        <Col>
          <h1>{i18n.t("Warehouses")}</h1>
        </Col>
        <Col>
          <NewPageButton link="/warehouses/new" text={i18n.t("Create new warehouse")} />
        </Col>
      </Row>
      <WarehouseList />
    </div>
);

export default Warehouses;