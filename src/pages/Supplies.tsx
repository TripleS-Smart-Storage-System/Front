import { Col, Row } from 'react-bootstrap';
import '../App.css';
import NewPageButton from '../components/NewPageButton';
import SupplyList from '../components/SupplyList';
import i18n from '../services/i18n';

const Supplies = () => (
    <div className='supplies'>
      <Row xs="auto" className="d-flex align-items-center">
        <Col>
          <h1>{i18n.t("Supplies")}</h1>
        </Col>
        <Col>
          <NewPageButton link="/supplies/new" text={i18n.t("Create supply order")} />
        </Col>
      </Row>
      <SupplyList />
    </div>
);

export default Supplies;