import '../App.css';
import NewSupplyOrderForm from '../components/NewSupplyOrderForm'
import { useNavigate, useParams } from 'react-router-dom';

function NewSupplyOrder() {  
  return (
      <div className='changeRole'>
      <h1>New Supply Order</h1>
      <NewSupplyOrderForm />
    </div>
  );
}

export default NewSupplyOrder;