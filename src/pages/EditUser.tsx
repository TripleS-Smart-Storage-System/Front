import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import EditUserForm from '../components/EditUserForm'
import i18n from '../services/i18n';

function EditUser() {
  const { id } = useParams();

  return (
    <div className='editUser'>
      <h1>{i18n.t("Edit user")}</h1>
      <EditUserForm userId={id as string} />
    </div>
  );
}


export default EditUser;