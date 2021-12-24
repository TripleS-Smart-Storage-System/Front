import { Col, Row } from 'react-bootstrap';
import '../App.css';
import RelocationForm from '../components/RelocationForm';
import i18n from '../services/i18n';

const Relocation = () => (
    <div className='relocation'>
      <Row xs="auto" className="d-flex align-items-center">
        <Col>
          <h1>{i18n.t("Relocation")}</h1>
        </Col>
      </Row>
      <RelocationForm />
    </div>
);

export default Relocation;