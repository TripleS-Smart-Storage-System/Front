import '../App.css';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';

const SignUpForm = () => (
  <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Name</Form.Label>
      <Form.Control required type="text" placeholder="Enter name" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Surnme</Form.Label>
      <Form.Control required type="text" placeholder="Enter surname" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control required type="email" placeholder="Enter email" />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control required type="password" placeholder="Password" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Check required type="checkbox" label="I agree with terms and conditions" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
);

const SignUp = () => (
    <div className='signup'>
      <h1>Sign Up</h1>
      <SignUpForm />
    </div>
);

export default SignUp;