import '../App.css';
import NewSupplyOrderForm from '../components/NewSupplyOrderForm'
import { useNavigate, useParams } from 'react-router-dom';
import i18n from '../services/i18n';

function NewSupplyOrder() {  
  return (
      <div className='changeRole'>
      <h1>{i18n.t("New supply order")}</h1>
      <NewSupplyOrderForm />
    </div>
  );
}

export default NewSupplyOrder;