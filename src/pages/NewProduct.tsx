import '../App.css';
import NewProductForm from '../components/NewProductForm'
import i18n from '../services/i18n';

const NewProduct = () => (
    <div className='newProduct'>
      <h1>{i18n.t("New product")}</h1>
      <NewProductForm />
    </div>
);

export default NewProduct;