import '../App.css';
import ChangeRoleForm from '../components/ChangeRole'
import { useNavigate, useParams } from 'react-router-dom';
import i18n from '../services/i18n';

function ChangeRole() {
    const { id } = useParams();
  
    return (
        <div className='changeRole'>
        <h1>{i18n.t("Change role")}</h1>
        <ChangeRoleForm userId={id as string} />
      </div>
    );
  }

export default ChangeRole;