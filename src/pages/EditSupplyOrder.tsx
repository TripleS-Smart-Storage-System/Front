import '../App.css';
import EditSupplyOrderForm from '../components/EditSupplyOrderForm'
import { useNavigate, useParams } from 'react-router-dom';

function NewSupplyOrder() {  
  const { id } = useParams();

  return (
      <div className='changeRole'>
      <h1>Edit Supply Order</h1>
      <EditSupplyOrderForm supplyId={id as string} />
    </div>
  );
}

export default NewSupplyOrder;