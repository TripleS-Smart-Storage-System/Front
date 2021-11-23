import axios from 'axios';
import React from 'react';
import config from '../config'
import { Button, Form } from 'react-bootstrap';

interface LooseObject {
  [key: string]: any
}

class Input implements LooseObject  {
  email: string = "";
  password: string = "";
}

class Error implements LooseObject  {
  check: string = "";
}

class NewUserData {
  email: string = "";
  password: string = "";
}

class SignInForm extends React.Component<{}, { input: LooseObject, errors: LooseObject }> {
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
        axios.post(config.serverUrl + '/Account/login', data).then(response => console.log(response)).catch((error) => {
            alert('error')
         })
        
        let input = new Input();
        this.setState({input:input});
    }
  }
  
  validate(){
      let input = this.state.input;
      let errors = new Error();
      let isValid = true;
  
      this.setState({
        errors: errors
      });
  
      return isValid;
  }
     
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
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