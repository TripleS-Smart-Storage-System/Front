import { useEffect, useLayoutEffect, useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Warehouse } from "../types";
import {
  getBoxes,
  getWarehouses,
  relocateBoxes
} from "../Utils/Api";
import SelectObject from "./SelectObject";


class RelocationRequest {
  wareHouseToRelocate: string;
  boxIds: string[];
  constructor(warehouseId = '', boxIds = new Array<string>()) {
    this.wareHouseToRelocate = warehouseId;
    this.boxIds = boxIds;
  }
}

function ChosenBoxes(props: {boxes: Box[], onChosenRoleRemoved: (boxId: string) => void}) {
  const chosenBoxes = props.boxes
  const options = chosenBoxes.map((box) => (
    <div className="justify-content-around">
      <Row id={box.id} xs="auto" className="my-2 justify-content-between">
        <Col xs={6}>
          <div className="p-2 border rounded">
            {box.supplyProduct.product.name}
          </div>
        </Col>
        <Col xs={3}>
          <div className="p-2 border rounded">
            {box.countLeft} {box.supplyProduct.product.unit.name}
          </div>
        </Col>
        <Col>
          <Button className="p-2" variant="danger" onClick={e => props.onChosenRoleRemoved(box.id)}>
            -
          </Button>
        </Col>
      </Row>
    </div>
  ));

  return (
    <div>
      {options.length ? options : (<div className="text-secondary">No chosen boxes</div>)}
    </div>
  );
}

function SelectBoxes(props: {boxes: Box[], onSelectedChosen: (boxId: string) => void}) {
  const unchosenBoxes = props.boxes;
  const [index, setIndex] = useState(0);

  const getIdByIndex = (idx: number) => unchosenBoxes[idx]?.id ?? ''

  const getIndexById = (id: string) => unchosenBoxes.map(p => p.id).indexOf(id)

  useLayoutEffect(() => {
    setIndex(0)
  }, [])

  const handleClick = () => {
    const boxId = getIdByIndex(index)
    if (boxId) {
      props.onSelectedChosen(boxId);
      unchosenBoxes.splice(index, 1);
      setIndex(0)
    }
  }

  const options = unchosenBoxes.map((box, i) => (
    <option selected={box.id == getIdByIndex(index)} value={i} id={box.id}>
      {`${box.supplyProduct.product.name} (${box.supplyProduct.count} ${box.supplyProduct.product.unit.name})`}
    </option>
  ))

  const isDisabled = unchosenBoxes.length == 0;

  return (
    <div className="mb-3">
      <Row xs="auto" className="g-2 justify-content-between">
        <Col xs={6}>
          <Form.Select
            id="unchosenBoxes"
            name="unchosenBoxes"
            value={index}
            onChange={(event) => {
              {setIndex(+event.target.value);}
            }}
            disabled={isDisabled}
          >
            {options}
          </Form.Select>
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
  const [boxes, setBoxes] = useState(new Array<Box>());
  const [chosenBoxes, setChosenBoxes] = useState(new Array<Box>());
  const [unchosenBoxes, setUnchosenBoxes] = useState(new Array<Box>());
  const [warehouseId, setChosenWarehouse] = useState('');
  const [warehouses, setWarehouses] = useState(new Array<Warehouse>());

  useEffect(() => {
    async function fetchApi() {
      const warehouses = await getWarehouses();
      if (warehouses.length == 0) {
        setError("We don't have any warehouses.");
        return
      } else {
        setWarehouses(warehouses)
        setChosenWarehouse(warehouses[0].id)
      }

      const boxes = await getBoxes();
      setBoxes(boxes);
      setUnchosenBoxes(boxes.slice(0));
      if (boxes.length == 0) {
        setError("We don't have any boxes.");
      }
    }

    fetchApi();
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const relocationRequest = new RelocationRequest(warehouseId, chosenBoxes.map(b => b.id))
    const relocationOrderResult = await relocateBoxes(relocationRequest)
    let error = relocationOrderResult?.error ?? ''

    if (error) {
      setError('Relocation: ' + error);
    } else {
      navigate("/warehouses");
    }
  };

  const removeChosenProduct = (boxId: string) => {
    const box = boxes.find(p => p.id == boxId)!
    setChosenBoxes(chosenBoxes.filter(p => p.id != boxId))
    setUnchosenBoxes(unchosenBoxes.concat([box]))
  }

  const choseSelectedProduct = (boxId: string) => {
    const box = boxes.find(p => p.id === boxId)!
    setChosenBoxes(chosenBoxes.concat([box]))
    setUnchosenBoxes(unchosenBoxes.filter(p => p.id != boxId))
  }

  const choseSelectedWarehouse = (warehouseId: string) => {
    setChosenWarehouse(warehouseId)
    setChosenBoxes(new Array<Box>())
    setUnchosenBoxes(boxes.filter(b => b.wareHouseId != warehouseId))
  }
  const { t } = useTranslation();
  return (
    <Form onSubmit={handleSubmit}>
      <div className="text-danger">
        <h6>{error}</h6>
      </div>
      <Form.Group className="mb-3">
        <Form.Label>{t("Destination warehouse:")} </Form.Label>
        <SelectObject objects={warehouses.map(w => {return {id: w.id, name: w.address}})} onSelectedChosen={choseSelectedWarehouse} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicRole">
        <Form.Label>{t("Available boxes:")} </Form.Label>
        <SelectBoxes boxes={unchosenBoxes} onSelectedChosen={choseSelectedProduct} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formNewSupply">
        <Form.Label>{t("Chosen boxes:")}</Form.Label>
        <ChosenBoxes boxes={chosenBoxes} onChosenRoleRemoved={removeChosenProduct} />
      </Form.Group>
      <Button variant="primary" type="submit">
        {t("Relocate")}
      </Button>
    </Form>
  );
}

export default NewSupplyOrderForm;
