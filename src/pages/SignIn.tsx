import '../App.css';
import SignInForm from '../components/SignInForm'
import i18n from '../services/i18n';

const SignIn = () => (
    <div className='signin'>
      <h1>{i18n.t("Sign in")}</h1>
      <SignInForm />
    </div>
);

export default SignIn;