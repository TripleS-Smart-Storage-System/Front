import axios from 'axios';
import React from 'react';
import config from '../config'
import { Button, Form } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import { Product, Unit } from '../types';
import { getProduct, getUnits } from '../Utils/Api'

interface LooseObject {
  [key: string]: any
}

class Input implements LooseObject {
  unitId: string = "";
  name: string = "";
  description: string = "";
  shelfLife: string = "1";
}

class EditProductData extends Input {
  id: string = "";
}

class EditProducForm extends React.Component<{productId: string}, { productId: string, input: LooseObject, units: Unit[], success: boolean, error: string}> {
  constructor(props: {productId: string}) {
    super(props);
    this.state = {
      productId: props.productId,
      input: new Input(),
      units: new Array<Unit>(),
      success: false,
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

    const productId = this.state.productId;
    const product: Product = await getProduct(productId);
    if (product.id != productId) {
      error = "Something went wrong"
    } else {
      input.unitId = product.unit.id;
      input.name = product.name;
      input.description = product.description;
      input.shelfLife = product.shelfLife.split('.')[0];
    }
    this.setState({units: units, input: input, error: error});
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

    const data: EditProductData = this.state.input as EditProductData;
    data.id = (this.props.productId).toString();

    let success = false;
    let error = '';
    await axios.put(config.serverUrl + '/Product', data).then(
      response => {
        success = true;
        if (response.status < 200 || response.status >= 300) {
          error = response.statusText;
          success = false;
        }
      }
    ).catch(function (err) {
      error = err.message;
    });

    this.setState({error: error, success: success})
  }
     
  render() {
    const unitId = this.state.input.unitId;
    const units = this.state.units;
    const index = units.findIndex(u => u.id == unitId);
    const unitOptions: JSX.Element[] = units.map((unit) =>
      <option selected={unitId == unit.id} value={unit.id} id={unit.id} key={unit.name}>{unit.name}</option>
    );

    const success = this.state.success;
    const error = this.state.error;
    
    return (
      <Form onSubmit={this.handleSubmit} action="/products">
        {error && (
          <div className="text-danger">
            <h6>{error}</h6>
          </div>
        ) || success && (
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
          Edit
        </Button>      
      </Form>
    );
  }
}
  
export default EditProducForm;