import axios from 'axios';
import React from 'react';
import config from '../config'
import { Button, Form } from 'react-bootstrap';
import { Navigate } from "react-router-dom";

interface LooseObject {
  [key: string]: any
}

class Input implements LooseObject {
  unitId: string = "";
  name: string = "";
  description: string = "";
  shelfLife: number = 1;
}

interface Unit {
  id: string;
  name: string
}

type NewProductData = Input;

class NewProducForm extends React.Component<{}, { input: LooseObject, units: Unit[], success: boolean, error: string}> {
  constructor(props: any) {
    super(props);
    this.state = {
      input: new Input(),
      units: new Array<Unit>(),
      success: false,
      error: ''
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectedChange = this.handleSelectedChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getUnits = this.getUnits.bind(this);

    this.getUnits().then(
      units => {
        this.setState({input: this.state.input, units: units});
      }
    );
  }

  async getUnits() {
    const response = await axios.get<Unit[]>(config.serverUrl + '/Unit/units');
    const units: Unit[] = response.data;
    return units;
  }
     
  handleChange(event: { target: { name: string | number; value: any }; }) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input: input
    });
  }

  handleSelectedChange(event: { target: any; }) {
    let input = this.state.input;
    input.unitId = event.target.value;
    console.log(input.unitId)

    this.setState({
      input: input
    });
  }
     
  handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();

    const data: NewProductData = this.state.input as Input

    let success = false;
    let error = '';
    axios.post(config.serverUrl + '/Product', data).then(
      response => {
        console.log(response.data);
        success = true;
      }
    ).catch(function (err) {
      error = err.mesage;
    });
    this.setState({input: new Input(), success: success, error: error})
  }
     
  render() {
    let unitOptions = this.state.units.map((unit) =>
      <option value={unit.id} id={unit.id} key={unit.name}>{unit.name}</option>
    );

    const success = this.state.success;
    const error = this.state.error;
    
    return (
      <Form onSubmit={this.handleSubmit} action="/products">
        {success && (
          <Navigate to="/products" replace={true} />
        )}
        {error.length != 0 && (
          <div className="text-danger">
            <h6>{error}</h6>
          </div>
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
        <Form.Group className="mb-3" controlId="formBasicUnit">
          <Form.Label>Unit</Form.Label>
          <Form.Select
            id="units"
            name="units"
            value={this.state.input.unit}
            onChange={this.handleSelectedChange}
            required
            placeholder="Enter unit"
          >
            {unitOptions}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicShelfLife">
          <Form.Label>Shelf life</Form.Label>
          <Form.Control
            id="shelfLife"
            name="shelfLife"
            value={this.state.input.shelfLife}
            onChange={this.handleChange}
            required
            type="number"
            min="1"
            max="365250"
            placeholder="Enter shelf life (days)"
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
  
export default NewProducForm;