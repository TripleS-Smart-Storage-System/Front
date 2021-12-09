import { Col, Row } from 'react-bootstrap';
import '../App.css';
import NewPageButton from '../components/NewPageButton';
import SupplyList from '../components/SupplyList';

const Supplies = () => (
    <div className='supplies'>
      <Row xs="auto" className="d-flex align-items-center">
        <Col>
          <h1>Supplies</h1>
        </Col>
        <Col>
          <NewPageButton link="/supply/new" text="Create supply order" />
        </Col>
      </Row>
      <SupplyList />
    </div>
);

export default Supplies;