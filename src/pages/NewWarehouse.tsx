import '../App.css';
import NewWarehouseForm from '../components/NewWarehouseForm'
import i18n from '../services/i18n';

const NewWarehouse = () => (
    <div className='newWarehouse'>
      <h1>{i18n.t("New warehouse")}</h1>
      <NewWarehouseForm />
    </div>
);

export default NewWarehouse;