import '../App.css';
import SignUpForm from '../components/SignUpForm'
import i18n from '../services/i18n';

const SignUp = () => (
    <div className='signup'>
      <h1>{i18n.t("Sign up")}</h1>
      <SignUpForm />
    </div>
);

export default SignUp;