import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';

function EditUser() {
  const { id } = useParams();

  return (
    <div className='editUser'>
      <h1>Edit User</h1>
    </div>
  );
}


export default EditUser;