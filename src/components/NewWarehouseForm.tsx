import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createNewWarehouse } from "../Utils/Api";
import { useTranslation } from "react-i18next";


class Input {
  email: string = "";
  address: string = "";
}

type WarehouseData = Input;

function NewWarehouseForm() {
  const navigate = useNavigate();
  const [input, setValues] = useState(new Input());
  const [error, setError] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const data: WarehouseData = input;
    const result = await createNewWarehouse(data);
    
    if (error) {
      setError(result?.error ?? "");
    } else {
      navigate('/warehouses')
    }
  };
  const { t } = useTranslation();
  return (
    <Form onSubmit={handleSubmit} action="/">
      <div className="text-danger">
        <h6>{error}</h6>
      </div>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{t("Email address")}</Form.Label>
        <Form.Control
          id="email"
          name="email"
          value={input.email}
          onChange={(event) => {
            setValues({ ...input, email: event.target.value });
          }}
          required
          type="email"
          placeholder={t("Enter email")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label>{t("Address")}</Form.Label>
        <Form.Control
          id="address"
          name="address"
          value={input.address}
          onChange={(event) => {
            setValues({ ...input, address: event.target.value });
          }}
          required
          type="text"
          placeholder={t("Enter address")}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {t("Save")}
      </Button>
    </Form>
  );
}

export default NewWarehouseForm;
