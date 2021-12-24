import '../App.css';
import EditSupplyOrderForm from '../components/EditSupplyOrderForm'
import { useNavigate, useParams } from 'react-router-dom';
import i18n from '../services/i18n';

function NewSupplyOrder() {  
  const { id } = useParams();

  return (
      <div className='changeRole'>
      <h1>{i18n.t("Edit supply order")}</h1>
      <EditSupplyOrderForm supplyId={id as string} />
    </div>
  );
}

export default NewSupplyOrder;