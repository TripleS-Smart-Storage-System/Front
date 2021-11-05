import axios from 'axios';
import React from 'react';
import config from '../config'
import { Button, Form } from 'react-bootstrap';

interface LooseObject {
  [key: string]: any
}

class Input implements LooseObject  {
  name: string = "";
  unit: string = "";
  description: string = "";
}

type NewProductData = Input;

class SignUpForm extends React.Component<{}, { input: LooseObject }> {
  constructor(props: any) {
    super(props);
    this.state = {
      input: new Input(),
    };
     
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
     
  handleChange(event: { target: { name: string | number; value: any }; }) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input: input
    });
  }
     
  handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();

    const data: NewProductData = this.state.input as Input
    const token = axios.post(config.serverUrl + '/products/new', data).then(response => console.log(response))
    this.setState({input: new Input()});
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
        <Form.Group className="mb-3" controlId="formBasicUnit">
          <Form.Label>Unit</Form.Label>
          <Form.Control
            id="unit"
            name="unit"
            value={this.state.input.unit}
            onChange={this.handleChange}
            required
            type="text"
            placeholder="Enter unit"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            id="description"
            name="description"
            value={this.state.input.description}
            onChange={this.handleChange}
            required
            as="textarea"
            rows={3}
            placeholder="Enter description" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>      
      </Form>
    );
  }
}
  
export default SignUpForm;