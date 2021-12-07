import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../Utils/Api';


class Input {
  name: string = "";
  surname: string = "";
  email: string = "";
  password: string = "";
  confirm_password: string = "";
  agreement: boolean = false;
}

class Error {
  confirm_password: string = "";
  message: string = "";
}

class NewUserData {
  name: string = "";
  surname: string = "";
  email: string = "";
  password: string = "";
}

function SignUpForm() {
  const navigate = useNavigate();
  const [input, setValues] = useState(new Input())
  const [errors, setErrors] = useState(new Error())
     
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  
    if(validate()){
      const data: NewUserData = input as Input

      const result = await signUp(data);
      if (result.error) {
        setErrors({confirm_password: '', message: result.error})
      } else {
        navigate('/signin')
      }
      
      setValues(new Input())
    }
  }
  
  const validate = () =>{
      let isValid = true;
      if (typeof input.password !== "undefined" && typeof input.confirm_password !== "undefined") {
        if (input.password != input.confirm_password) {
          isValid = false;
          setErrors({message: '', confirm_password: "Passwords don't match."})
        }
      }  
      return isValid;
  }
     
  return (
    <Form onSubmit={handleSubmit}>
      <div className="text-danger">
        <h6>{errors.message}</h6>
      </div>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          id="name"
          name="name"
          value={input.name}
          onChange={(e) => {setValues({...input, name: e.target.value})}}
          required
          type="text"
          placeholder="Enter name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicSurname">
        <Form.Label>Surname</Form.Label>
        <Form.Control
          id="surname"
          name="surname"
          value={input.surname}
          onChange={(e) => {setValues({...input, surname: e.target.value})}}
          required
          type="text"
          placeholder="Enter surname"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          id="email"
          name="email"
          value={input.email}
          onChange={(e) => {setValues({...input, email: e.target.value})}}
          required
          type="email"
          placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          id="password"
          name="password"
          value={input.password}
          onChange={(e) => {setValues({...input, password: e.target.value})}}
          required
          type="password"
          placeholder="Enter password"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control
          id="confirm_password"
          name="confirm_password"
          value={input.confirm_password}
          onChange={(e) => {setValues({...input, confirm_password: e.target.value})}}
          required
          type="password"
          placeholder="Enter password again"
        />
        <div className="text-danger">{errors.confirm_password}</div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          checked={input.agreement}
          onChange={(e) => {setValues({...input, agreement: e.target.checked})}}
          required
          name="agreement"
          type="checkbox"
          label="I agree with terms and conditions" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>      
    </Form>
  );
}
  
export default SignUpForm;