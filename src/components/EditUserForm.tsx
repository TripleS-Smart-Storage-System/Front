import axios from 'axios';
import React from 'react';
import config from '../config'
import { Button, Form } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import { User, Unit } from '../types';
import { truncateSync } from 'fs';
import { couldStartTrivia } from 'typescript';

interface LooseObject {
  [key: string]: any
}

class Error {
  message: string = "";
  status: number = 0;
}

class Input implements LooseObject {
  name: string = "";
  surName: string = "";
  nickName: string = "";
}

class EditUserData extends Input {
  id: string = "";
}

class EditProducForm extends React.Component<{userId: string}, { userId: string, input: LooseObject, units: Unit[], success: boolean, errors: Error}> {
  constructor(props: {userId: string}) {
    super(props);
    this.state = {
      userId: props.userId,
      input: new Input(),
      units: new Array<Unit>(),
      success: false,
      errors: new Error()
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectedChange = this.handleSelectedChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  async componentDidMount() {
    const input = this.state.input;
    const userId = this.state.userId;
    const user: User = await this.getUser(userId);
    const errors = new Error()
    if (user.id != userId) {
      errors.message = "Something went wrong"
    } else {
      input.name = user.name;
      input.surName = user.surName;
      input.nickName = user.nickName;
    }
    this.setState({input: input, errors: errors});
  }

  async getUser(id: String) {
    const response = await axios.get<User>(config.serverUrl + '/User?id=' + id);
    const user: User = response.data;
    return user;
  }
     
  handleChange(event: { target: { name: string | number; value: any }; }) {
    let input = this.state.input;
    input[event.target.name] = event.target.value.toString();

    this.setState({
      input: input
    });
  }

  handleSelectedChange(event: { target: any; }) {
    let input = this.state.input;
    input.unitId = event.target.value;

    this.setState({
      input: input
    });
  }
     
  async handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();

    const data: EditUserData = this.state.input as EditUserData;
    data.id = (this.props.userId).toString();

    let success = false;
    let error = new Error();
    await axios.put(config.serverUrl + '/User', data).then(
      response => {
        success = true;
        if (response.status < 200 || response.status >= 300) {
          error.message = response.statusText;
          error.status = response.status;
          success = false;
        }
      }
    ).catch(function (err) {
      error.message = err.message;
      error.status = err.status;
    });

    this.setState({errors: error, success: success})
  }
     
  render() {
    const unitId = this.state.input.unitId;
    const units = this.state.units;
    const index = units.findIndex(u => u.id == unitId);
    const unitOptions: JSX.Element[] = units.map((unit) =>
      <option selected={unitId == unit.id} value={unit.id} id={unit.id} key={unit.name}>{unit.name}</option>
    );

    const success = this.state.success;
    const error = this.state.errors;
    
    return (
      <Form onSubmit={this.handleSubmit} action="/users">
        {error.message && (
          <div className="text-danger">
            <h6>{error}</h6>
          </div>
        ) || success && (
          <Navigate to="/users" replace={true} />
        )}
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
            id="surName"
            name="surName"
            value={this.state.input.surName}
            onChange={this.handleChange}
            required
            type="text"
            placeholder="Enter surName"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicNickname">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            id="nickName"
            name="nickName"
            value={this.state.input.nickName}
            onChange={this.handleChange}
            required
            type="text"
            placeholder="Enter nickname" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>      
      </Form>
    );
  }
}
  
export default EditProducForm;