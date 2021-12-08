import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import config from "../config";
import { Button, Form } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { Role } from "../types";
import { getRoles, getUser } from "../Utils/Api";

interface LooseObject {
  [key: string]: any;
}

class Error {
  message: string = "";
  status: number = 0;
}

class Input {
  roleId: string = "";
}

type ChangeRoleData = Input;

function ChangeRoleForm(props: { userId: string }) {
  const navigate = useNavigate();
  const userId = props.userId;
  const [input, setValues] = useState(new Input());
  const [error, setError] = useState("");
  const [roles, setRoles] = useState(new Array<Role>());
  const [currentRoles, putRoles] = useState("");
  const [roleOptions, setRoleOptions] = useState(new Array<JSX.Element>());

  useEffect(() => {
    async function fetchApi() {
      const roles = await getRoles();
      setRoles(roles);
      if (roles.length == 0) {
        setError("We don't have any roles.");
      } else {
        input.roleId = roles[0].id;
        setValues(input);
        const options = roles.map((role) => (
          <option value={role.id} id={role.id} key={role.name}>
            {role.name}
          </option>
        ));
        setRoleOptions(options);
      }
      const userData = await getUser(userId);
      let allRoles = "";
      for (let i = 0; i < userData.roles.length; ++i) {
        allRoles = allRoles + userData.roles[i].name;
        if (i < userData.roles.length - 1) {
          allRoles = allRoles + ", ";
        }
      }
      putRoles(allRoles);
    }

    fetchApi();
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const data: ChangeRoleData = input as Input;
    // const result = await ();                                                          TODO: update user
    setError("");
  };

  return (
    <Form onSubmit={handleSubmit} action="/">
      <div className="text-danger">
        <h6>{error}</h6>
      </div>
      <Form.Group className="mb-3" controlId="formCurrentRole">
        <Form.Label>CURRENT ROLES OF THE USER: </Form.Label>
        <Form.Label>{currentRoles}</Form.Label>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicRole">
        <Form.Label>Role</Form.Label>
        <Form.Select
          id="roles"
          name="roles"
          value={input.roleId}
          onChange={(event) => {
            setValues({ ...input, roleId: event.target.value });
          }}
          required
        >
          {roleOptions}
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        +
      </Button>
      <Form.Label>-</Form.Label>
      <Button variant="primary" type="submit">
        -
      </Button>
    </Form>
  );
}

export default ChangeRoleForm;
