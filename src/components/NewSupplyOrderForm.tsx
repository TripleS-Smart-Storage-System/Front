import { useEffect, useLayoutEffect, useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Product, Warehouse } from "../types";
import { useTranslation } from "react-i18next";
import {
  createSupplyOrder,
  createSupplyProductOrder,
  getProducts,
  getWarehouses
} from "../Utils/Api";
import { getUser } from "../Utils/Common";
import SelectObject from "./SelectObject";


class ProductWithCount {
  id: string = "";
  name: string = "";
  unitName: string = "";
  count: number = 1;
  constructor (product: Product, count: number) {
    this.id = product.id;
    this.name = product.name;
    this.unitName = product.unit.name;
    this.count = count;
  }
}

class SupplyRequest {
  supplyCreatedUserId: string;
  warehouseId: string;
  dateOrdered: Date;
  constructor (userId = '', warehouseId= '') {
    this.warehouseId = warehouseId;
    this.supplyCreatedUserId = userId;
    this.dateOrdered = new Date();
  }
}

class SupplyProductRequest {
  supplyId: string;
  productId: string;
  count: number;
  constructor (product: ProductWithCount, supplyId = '') {
    this.supplyId = supplyId;
    this.productId = product.id;
    this.count = product.count;
  }
}

function ChosenProducts(props: {products: ProductWithCount[], onChosenRoleRemoved: (roleId: string) => void}) {
  const chosenProducts = props.products
  const options = chosenProducts.map((product) => (
    <div className="justify-content-around">
      <Row id={product.id} xs="auto" className="my-2 justify-content-between">
        <Col xs={6}>
          <div className="p-2 border rounded">
            {product.name}
          </div>
        </Col>
        <Col xs={3}>
          <div className="p-2 border rounded">
            {product.count} {product.unitName}
          </div>
        </Col>
        <Col>
          <Button className="p-2" variant="danger" onClick={e => props.onChosenRoleRemoved(product.id)}>
            -
          </Button>
        </Col>
      </Row>
    </div>
  ));
  const { t } = useTranslation();
  return (
    <div>
      {options.length ? options : (<div className="text-secondary">{t("No chosen products")}</div>)}
    </div>
  );
}

function SelectProducts(props: {products: Product[], onSelectedChosen: (roleId: string, count: number) => void}) {
  const unchosenProducts = props.products;
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(1);

  const getIdByIndex = (idx: number) => unchosenProducts[idx]?.id ?? ''

  const getIndexById = (id: string) => unchosenProducts.map(p => p.id).indexOf(id)

  useLayoutEffect(() => {
    setIndex(0)
    setCount(1)
  }, [])

  const handleClick = () => {
    const productId = getIdByIndex(index)
    if (productId) {
      props.onSelectedChosen(productId, count)
      unchosenProducts.splice(index, 1);
      setCount(1)
      setIndex(0)
    }
  }

  const options = unchosenProducts.map((product, i) => (
    <option selected={product.id == getIdByIndex(index)} value={i} id={product.id}>
      {product.name}
    </option>
  ))

  const isDisabled = unchosenProducts.length == 0;

  return (
    <div className="mb-3">
      <Row xs="auto" className="g-2 justify-content-between">
        <Col xs={6}>
          <Form.Select
            id="unchosenProducts"
            name="unchosenProducts"
            value={index}
            onChange={(event) => {
              {setIndex(+event.target.value);}
            }}
            disabled={isDisabled}
          >
            {options}
          </Form.Select>
        </Col>
        <Col xs={3}>
          <Form.Control
            id="count"
            name="count"
            value={count}
            onChange={(event) => {setCount(+event.target.value);}}
            required
            type="number"
            min="1"
            max="1000"
            placeholder="Count"
            disabled={isDisabled}
          />
        </Col>
        <Col>
          <Button variant="primary" onClick={handleClick} disabled={isDisabled}>
            +
          </Button>
        </Col>
      </Row>
    </div>
  );
}

function NewSupplyOrderForm() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [products, setProducts] = useState(new Array<Product>());
  const [chosenProducts, setChosenProducts] = useState(new Array<ProductWithCount>());
  const [unchosenProducts, setUnchosenProducts] = useState(new Array<Product>());
  const [warehouseId, setChosenWarehouse] = useState('');
  const [warehouses, setWarehouses] = useState(new Array<Warehouse>());

  useEffect(() => {
    async function fetchApi() {
      const products = await getProducts();
      setProducts(products);
      setUnchosenProducts(products.slice(0));
      if (products.length == 0) {
        setError("We don't have any products.");
      }
      const warehouses = await getWarehouses();
      if (warehouses.length == 0) {
        setError("We don't have any warehouses.");
      } else {
        setWarehouses(warehouses)
        setChosenWarehouse(warehouses[0].id)
      }
    }

    fetchApi();
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const user = getUser()
    const supply = new SupplyRequest(user, warehouseId)
    const supplyOrderResult = await createSupplyOrder(supply)
    const supplyId = supplyOrderResult?.response?.data! as string ?? '';
    let error = supplyOrderResult?.error ?? ''

    if (error) {
      setError('New order: ' + error);
      return
    }

    const sendProductSupply = async (product: ProductWithCount): Promise<string> => {
      const supplyProduct = new SupplyProductRequest(product, supplyId)
      const supplyProductResult = await createSupplyProductOrder(supplyProduct)
      error = error ? error : supplyProductResult?.error ?? ''
      return supplyProductResult?.response?.data! as string ?? '';
    }

    const productSupplyResults = await Promise.all(chosenProducts.map(sendProductSupply))
    if (error) {
      setError(error);
    } else {
      navigate("/supplies");
    }
  };

  const removeChosenProduct = (productId: string) => {
    const newChosenProducts = chosenProducts.filter(p => p.id != productId)
    setChosenProducts(newChosenProducts)
    const newUnchosenProducts = products.filter(p => !newChosenProducts.map(cp => cp.id).includes(p.id))
    setUnchosenProducts(newUnchosenProducts)
  }

  const choseSelectedProduct = (productId: string, count: number) => {
    const product = products.find(p => p.id === productId)!
    setChosenProducts(chosenProducts.concat([new ProductWithCount(product, count)]))
    setUnchosenProducts(unchosenProducts.filter(p => p.id != productId))
  }

  const choseSelectedWarehouse = (warehouseId: string) => {
    console.log(warehouseId)
    setChosenWarehouse(warehouseId)
  }
  const { t } = useTranslation();
  return (
    <Form onSubmit={handleSubmit}>
      <div className="text-danger">
        <h6>{error}</h6>
      </div>
      <Form.Group className="mb-3">
        <Form.Label>{t("Warehouse")}: </Form.Label>
        <SelectObject objects={warehouses.map(w => {return {id: w.id, name: w.address}})} onSelectedChosen={choseSelectedWarehouse} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicRole">
        <Form.Label>{t("Available products")}: </Form.Label>
        <SelectProducts products={unchosenProducts} onSelectedChosen={choseSelectedProduct} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formNewSupply">
        <Form.Label>{t("Chosen products")}: </Form.Label>
        <ChosenProducts products={chosenProducts} onChosenRoleRemoved={removeChosenProduct} />
      </Form.Group>
      <Button variant="primary" type="submit">
        {t("Save")}
      </Button>
    </Form>
  );
}

export default NewSupplyOrderForm;
