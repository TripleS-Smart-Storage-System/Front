import '../App.css';
import UserList from '../components/UserList';
import i18n from '../services/i18n';

const Users = () => (
    <div className='users'>
      <h1>{i18n.t("Users")}</h1>
      <UserList />
    </div>
);

export default Users;