import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import EditProductForm from '../components/EditProductForm'
import i18n from '../services/i18n';

function EditProduct() {
  const { id } = useParams();

  return (
    <div className='editProduct'>
      <h1>{i18n.t("Edit product")}</h1>
      <EditProductForm productId={id as string} />
    </div>
  );
}


export default EditProduct;