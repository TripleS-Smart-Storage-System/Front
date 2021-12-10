import '../App.css';
import ChangeRoleForm from '../components/ChangeRole'
import { useNavigate, useParams } from 'react-router-dom';

function ChangeRole() {
    const { id } = useParams();
  
    return (
        <div className='changeRole'>
        <h1>Change Role</h1>
        <ChangeRoleForm userId={id as string} />
      </div>
    );
  }

export default ChangeRole;