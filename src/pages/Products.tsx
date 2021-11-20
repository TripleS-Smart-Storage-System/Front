import '../App.css';
import NewPageButton from '../components/NewPageButton';

const Products = () => (
    <div className='products'>
      <h1>Products</h1>
      <NewPageButton link="/products/new" text="Add product" />
    </div>
);

export default Products;