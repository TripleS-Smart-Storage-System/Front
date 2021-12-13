import { useEffect, useLayoutEffect, useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  Product,
  SupplyProduct,
  SupplyWithProducts
} from "../types";
import { createSupplyProductOrder,
  deleteSupplyProduct,
  getProducts,
  getSupplyWithProducts
} from "../Utils/Api";


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

function ChosenProducts(props: {products: SupplyProduct[], onChosenRoleRemoved: (supplyProductId: string) => Promise<void>}) {
  const chosenProducts = props.products
  const options = chosenProducts.map((supplyProduct) => (
    <div className="justify-content-around">
      <Row id={supplyProduct.product.id} xs="auto" className="my-2 justify-content-between">
        <Col xs={6}>
          <div className="p-2 border rounded">
            {supplyProduct.product.name}
          </div>
        </Col>
        <Col xs={3}>
          <div className="p-2 border rounded">
            {supplyProduct.count} {supplyProduct.product.unit.name}
          </div>
        </Col>
        <Col>
          <Button className="p-2" variant="danger" onClick={e => props.onChosenRoleRemoved(supplyProduct.id)}>
            -
          </Button>
        </Col>
      </Row>
    </div>
  ));

  return (
    <div>
      {options.length ? options : (<div className="text-secondary">No chosen products</div>)}
    </div>
  );
}

function SelectProducts(props: {products: Product[], supplyId: string, onSelectedChosen: (product: SupplyProductRequest) => Promise<boolean>}) {
  const supplyId = props.supplyId;
  const unchosenProducts = props.products;
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(1);

  const getIdByIndex = (idx: number) => unchosenProducts[idx]?.id ?? ''

  const getIndexById = (id: string) => unchosenProducts.map(p => p.id).indexOf(id)

  useLayoutEffect(() => {
    setIndex(0)
    setCount(1)
  }, [])

  const handleClick = async () => {
    const productId = getIdByIndex(index)
    if (productId) {
      const product = new ProductWithCount(unchosenProducts[index], count)
      const supplyProduct = new SupplyProductRequest(product, supplyId)
      props.onSelectedChosen(supplyProduct).then(
        res => {
          if(res) {
            unchosenProducts.splice(index, 1);
            setCount(1)
            setIndex(0)
          }
        }
      )
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
          <Button variant="primary"  type="submit" onClick={handleClick} disabled={isDisabled}>
            +
          </Button>
        </Col>
      </Row>
    </div>
  );
}

function EditSupplyOrderForm(props: {supplyId: string}) {
  const navigate = useNavigate();
  const supplyId = props.supplyId;
  const [error, setError] = useState("");
  const [products, setProducts] = useState(new Array<Product>());
  const [chosenProducts, setChosenProducts] = useState(new Array<SupplyProduct>());
  const [unchosenProducts, setUnchosenProducts] = useState(new Array<Product>());

  useEffect(() => {
    async function fetchApi() {
      const products = await getProducts();
      setProducts(products);
      const supply: SupplyWithProducts = await getSupplyWithProducts(supplyId);
      setChosenProducts(supply.supplyProducts);
      setUnchosenProducts(products.filter(p => !supply.supplyProducts.map(sp => sp.product.id).includes(p.id)));
      if (products.length == 0) {
        setError("We don't have any products.");
      }
    }

    fetchApi();
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const removeChosenProduct = async (supplyProductId: string) => {
    const supplyProduct = chosenProducts[chosenProducts.findIndex(cp => cp.id == supplyProductId)!]
    await deleteSupplyProduct(supplyProductId)
    window.location.reload()
  }

  const choseSelectedProduct = async (supplyProduct: SupplyProductRequest): Promise<boolean> => {
    console.log(supplyProduct)
    const supplyProductResult = await createSupplyProductOrder(supplyProduct)
    const error = supplyProductResult?.error ?? ''
    if (error) {
      setError(error)
      return false
    } else {
      window.location.reload();
      return true
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className="text-danger">
        <h6>{error}</h6>
      </div>
      <Form.Group className="mb-3" controlId="formBasicRole">
        <Form.Label>Available products: </Form.Label>
        <SelectProducts products={unchosenProducts} supplyId={supplyId} onSelectedChosen={choseSelectedProduct} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formNewSupply">
        <Form.Label>Chosen products:</Form.Label>
        <ChosenProducts products={chosenProducts} onChosenRoleRemoved={removeChosenProduct} />
      </Form.Group>
    </Form>
  );
}

export default EditSupplyOrderForm;
