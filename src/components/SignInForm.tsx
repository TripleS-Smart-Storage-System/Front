import axios from 'axios';
import React from 'react';
import config from '../config'
import { Button, Form } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

interface LooseObject {
  [key: string]: any
}

class Input implements LooseObject  {
  email: string = "";
  password: string = "";
}

class Error {
  message: string = "";
  status: number = 0;
}

class NewUserData {
  email: string = "";
  password: string = "";
}

class SignInForm extends React.Component<{}, { input: LooseObject, success: boolean, errors: LooseObject }> {
  constructor(props: any) {
    super(props);
    this.state = {
      input: new Input(),
      success: false,
      errors: new Error()
    };
     
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
     
  handleChange(event: { target: { name: string | number; value: any; type: string; checked?: boolean }; }) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
  
    this.setState({
      input: input,
      errors: new Error()
    });
  }
     
  async handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();

    const data: NewUserData = this.state.input as Input
    const errors = new Error();
    let success = false;
    await axios.post(config.serverUrl + '/Account/login', data)
    .then(response => {
      success = true;
      if (response.status < 200 || response.status >= 300) {
        errors.message = response.statusText;
        errors.status = response.status;
        success = false;
      }
    })
    .catch((err) => {
      errors.message = err.message;
      errors.status = err.status;
    })
    
    const input = new Input();
    this.setState({input: input, success: success, errors: errors});
  }
     
  render() {
    const error = this.state.errors;
    const success = this.state.success;
    return (
      <Form onSubmit={this.handleSubmit}>
        {error.message && (
          <div className="text-danger">
            <h6>{error.message}</h6>
          </div>
        ) || success && (
          <Navigate to="/" replace={true} />
        )}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            id="email"
            name="email"
            value={this.state.input.email}
            onChange={this.handleChange}
            required
            type="email"
            placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="password"
            name="password"
            value={this.state.input.password}
            onChange={this.handleChange}
            required
            type="password"
            placeholder="Enter password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>      
      </Form>
    );
  }
}
  
export default SignInForm;