import '../App.css';
import i18n from '../services/i18n';

const Product = () => (
    <div className='product'>
      <h1>{i18n.t("Product")}</h1>
    </div>
);

export default Product;