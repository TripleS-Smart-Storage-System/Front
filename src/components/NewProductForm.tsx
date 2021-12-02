import axios from 'axios';
import React from 'react';
import config from '../config'
import { Button, Form } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import { Unit } from '../types';
import { createNewProduct, getUnits } from '../Utils/Api';

interface LooseObject {
  [key: string]: any
}

class Input implements LooseObject {
  unitId: string = "";
  name: string = "";
  description: string = "";
  shelfLife: string = "1";
}

type NewProductData = Input;

class NewProducForm extends React.Component<{}, { input: LooseObject, units: Unit[], newProductId: string, error: string}> {
  constructor(props: any) {
    super(props);
    this.state = {
      input: new Input(),
      units: new Array<Unit>(),
      newProductId: '',
      error: ''
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectedChange = this.handleSelectedChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const units: Unit[] = await getUnits();
    const input = this.state.input;
    let error = this.state.error;
    if (units.length == 0) {
      error = "We don't have any units."
    } else {
      input.unitId = units[0].id;
    }
    this.setState({units: units, input: input, error: error});
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

    this.setState({
      input: input
    });
  }
     
  async handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();

    const data: NewProductData = this.state.input as Input

    const result = await createNewProduct(data)
    let newProductId = result.response?.data ?? '';

    this.setState({input: new Input(), error: result.error, newProductId: newProductId})
  }
     
  render() {
    let unitOptions = this.state.units.map((unit) =>
      <option value={unit.id} id={unit.id} key={unit.name}>{unit.name}</option>
    );

    const newProductId = this.state.newProductId;
    const error = this.state.error;
    
    return (
      <Form onSubmit={this.handleSubmit} action="/products">
        {error && (
          <div className="text-danger">
            <h6>{error}</h6>
          </div>
        ) || newProductId && (
          <Navigate to="/products" replace={true} />
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
            as="textarea"
            required
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