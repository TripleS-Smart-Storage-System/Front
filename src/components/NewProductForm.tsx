import axios from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import config from '../config'
import { Button, Form } from 'react-bootstrap';
import { Navigate, useNavigate } from "react-router-dom";
import { Unit } from '../types';
import { createNewProduct, getUnits } from '../Utils/Api';


class Input {
  unitId: string = "";
  name: string = "";
  description: string = "";
  shelfLife: string = "1";
}

type NewProductData = Input;

function NewProducForm() {
  const navigate = useNavigate();
  const [units, setUnits] = useState(new Array<Unit>());
  const [input, setValues] = useState(new Input())
  const [error, setError] = useState('')
  const [unitOptions, setUnitOptions] = useState(new Array<JSX.Element>());

  useEffect(() => {
    async function fetchApi() {
      const units = await getUnits();
      setUnits(units);
      if (units.length == 0) {
        setError("We don't have any units.")
      } else {
        input.unitId = units[0].id;
        setValues(input)
        const options = units.map((unit) =>
          <option value={unit.id} id={unit.id} key={unit.name}>{unit.name}</option>
        );
        setUnitOptions(options);
      }
    }

    fetchApi();
  }, [])

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const data: NewProductData = input as Input
    const result = await createNewProduct(data)
    setError(result?.error ?? '');
    const newProductId = result.response?.data ?? '';
    if (newProductId && error.length != 0) {
      navigate('/products');
    }
  }

  return (
    <Form onSubmit={handleSubmit} action="/products">
      <div className="text-danger"><h6>{error}</h6></div>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          id="name"
          name="name"
          value={input.name}
          onChange={(event) => {setValues({...input, name: event.target.value});}}
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
          value={input.unitId}
          onChange={(event) => {setValues({...input, unitId: event.target.value});}}
          required
        >
          {unitOptions}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicShelfLife">
        <Form.Label>Shelf life</Form.Label>
        <Form.Control
          id="shelfLife"
          name="shelfLife"
          value={input.shelfLife}
          onChange={(event) => {setValues({...input, shelfLife: event.target.value});}}
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
          value={input.description}
          onChange={(event) => {setValues({...input, description: event.target.value});}}
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


export default NewProducForm;