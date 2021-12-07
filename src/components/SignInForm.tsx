import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import config from "../config";
import { Button, Form } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { Unit } from "../types";
import { signIn, getUnits } from "../Utils/Api";

interface LooseObject {
  [key: string]: any;
}

class Error {
  message: string = "";
  status: number = 0;
}

class Input {
  email: string = "";
  password: string = "";
}

type SignInData = Input;

function SignInForm() {
  const navigate = useNavigate();
  const [input, setValues] = useState(new Input());
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchApi() {
      setValues(input);
    }

    fetchApi();
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const data: SignInData = input as Input;
    const result = await signIn(data);
    setError(result?.error ?? "");

    const token = result.response?.data.token ?? "";
    const user = result.response?.data.id ?? "";
    // setUserSession(token, user)

    if (user) {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={handleSubmit} action="/">
      <div className="text-danger">
        <h6>{error}</h6>
      </div>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          id="email"
          name="email"
          value={input.email}
          onChange={(event) => {
            setValues({ ...input, email: event.target.value });
          }}
          required
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          id="password"
          name="password"
          value={input.password}
          onChange={(event) => {
            setValues({ ...input, password: event.target.value });
          }}
          required
          type="password"
          placeholder="Enter password"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default SignInForm;
