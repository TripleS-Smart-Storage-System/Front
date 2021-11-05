import axios from 'axios';
import React from 'react';
import config from '../config'
import { Button, Form } from 'react-bootstrap';

interface LooseObject {
  [key: string]: any
}

class Input implements LooseObject  {
  name: string = "";
  surname: string = "";
  email: string = "";
  password: string = "";
  confirm_password: string = "";
  agreement: boolean = false;
}

class Error implements LooseObject  {
  confirm_password: string = "";
}

class NewUserData {
  name: string = "";
  surname: string = "";
  email: string = "";
  password: string = "";
}

class SignUpForm extends React.Component<{}, { input: LooseObject, errors: LooseObject }> {
  constructor(props: any) {
    super(props);
    this.state = {
      input: new Input(),
      errors: new Error()
    };
     
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
     
  handleChange(event: { target: { name: string | number; value: any; type: string; checked?: boolean }; }) {
    let input = this.state.input;
    if (event.target.type == 'checkbox') 
    {
      input[event.target.name] = event.target.checked;
    } else {
      input[event.target.name] = event.target.value;
    }
  
    this.setState({
      input: input,
      errors: new Error()
    });
  }
     
  handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();
  
    if(this.validate()){
        const data: NewUserData = this.state.input as Input
        axios.post(config.serverUrl + '/signup', data).then(response => console.log(response))
        let input = new Input();
        this.setState({input:input});
    }
  }
  
  validate(){
      let input = this.state.input;
      let errors = new Error();
      let isValid = true;
  
      if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {
          
        if (input["password"] != input["confirm_password"]) {
          isValid = false;
          errors["confirm_password"] = "Passwords don't match.";
        }
      } 
  
      this.setState({
        errors: errors
      });
  
      return isValid;
  }
     
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            id="name"
            name="name"
            value={this.state.input.name}
            onChange={this.handleChange}
            required
            type="text"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSurname">
          <Form.Label>Surnme</Form.Label>
          <Form.Control
            id="surname"
            name="surname"
            value={this.state.input.surname}
            onChange={this.handleChange}
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
            value={this.state.input.email}
            onChange={this.handleChange}
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
            value={this.state.input.password}
            onChange={this.handleChange}
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
            value={this.state.input.confirm_password}
            onChange={this.handleChange}
            required
            type="password"
            placeholder="Enter password again"
          />
          <div className="text-danger">{this.state.errors.confirm_password}</div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            checked={this.state.input.agreement}
            onChange={this.handleChange}
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
}
  
export default SignUpForm;