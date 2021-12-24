import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../App.css';
import BoxList from '../components/BoxList';
import i18n from '../services/i18n';

function Warehouse () {
  const { id } = useParams();
  return (
    <div className='warehouses'>
      <Row xs="auto" className="d-flex align-items-center">
        <Col>
          <h1>{i18n.t("Warehouse")}</h1>
        </Col>
      </Row>
      <BoxList warehouseId={id as string} />
    </div>
  );
}

export default Warehouse;