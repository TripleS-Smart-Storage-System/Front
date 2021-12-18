import React, { useLayoutEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { Product, Unit } from '../types';
import { getProduct, getUnits, updateProduct } from '../Utils/Api'
import { useTranslation } from "react-i18next";


class Input {
  unitId: string = "";
  name: string = "";
  description: string = "";
  shelfLife: string = "1";
}

class EditProductData extends Input {
  id: string = "";
}

function EditProducForm(props: {productId: string}) {
  const navigate = useNavigate();
  const productId = props.productId
  const [input, setValues] = useState(new Input())
  const [units, setUnits] = useState(new Array<Unit>())
  const [error, setError] = useState('')
  
  useLayoutEffect(() => {
    async function fetchApi() {
      const units: Unit[] = await getUnits();
      setUnits(units);  
      if (units.length == 0) {
        setError("We don't have any units.")
      } else {
        input.unitId = units[0].id;
      }

      const product: Product = await getProduct(productId);
      if (product.id != productId) {
        setError("Something went wrong")
      } else {
        setValues({
          unitId: product.unit.id,
          name: product.name,
          description: product.description,
          shelfLife: product.shelfLife.split('.')[0]
        });
      }
    }
    fetchApi()
  }, [])
     
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const data: EditProductData = input as EditProductData;
    data.id = (props.productId).toString();

    const result = await updateProduct(data);
    const error = result?.error ?? '';
    if (error) {
      setError(error)
    } else {
      navigate('/products')
    }
  }
  const { t } = useTranslation();
  return (
    <Form onSubmit={handleSubmit} action="/products">
      <div className="text-danger">
        <h6>{error}</h6>
      </div>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>{t("Name")}</Form.Label>
        <Form.Control
          id="name"
          name="name"
          value={input.name}
          onChange={e => {setValues({...input, name: e.target.value});}}
          required
          type="text"
          placeholder={t("Enter name")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicUnit">
        <Form.Label>{t("Unit: ")}</Form.Label>
        <Form.Select
          id="units"
          name="units"
          value={input.unitId}
          onChange={e => {setValues({...input, unitId: e.target.value})}}
          required
          placeholder={t("Enter unit")}
        >
        {units.map((unit) =>
          <option selected={input.unitId == unit.id} value={unit.id} id={unit.id} key={unit.name}>{unit.name}</option>
        )}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicShelfLife">
        <Form.Label>{t("Shelf life: ")}</Form.Label>
        <Form.Control
          id="shelfLife"
          name="shelfLife"
          value={input.shelfLife}
          onChange={e => {setValues({...input, shelfLife: e.target.value.toString()});}}
          required
          type="number"
          min="1"
          max="365250"
          placeholder={t("Enter shelf life (days)")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>{t("Description: ")}</Form.Label>
        <Form.Control
          id="description"
          name="description"
          value={input.description}
          onChange={e => {setValues({...input, description: e.target.value});}}
          as="textarea"
          required
          rows={3}
          placeholder={t("Enter description")} />
      </Form.Group>
      <Button variant="primary" type="submit">
        {t("Submit")}
      </Button>      
    </Form>
  );
}
  
export default EditProducForm;