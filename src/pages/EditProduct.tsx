import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import EditProductForm from '../components/EditProductForm'

function EditProduct() {
  const { id } = useParams();

  return (
    <div className='editProduct'>
      <h1>Edit Product</h1>
      <EditProductForm productId={id as string} />
    </div>
  );
}


export default EditProduct;