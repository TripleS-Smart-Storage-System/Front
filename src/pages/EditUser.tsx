import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import EditUserForm from '../components/EditUserForm'

function EditUser() {
  const { id } = useParams();

  return (
    <div className='editUser'>
      <h1>Edit User</h1>
      <EditUserForm userId={id as string} />
    </div>
  );
}


export default EditUser;