import { useEffect, useLayoutEffect, useState } from "react";
import { Button, Col, Row, Form, Container } from "react-bootstrap";
import {useNavigate } from "react-router-dom";
import { Role, User } from "../types";
import { getRoles, getUser, updateRoles } from "../Utils/Api";
import UserList from "./UserList";


class Changes {
  userId: string = "";
  roles: Array<string> = new Array<string>();
}

function ChosenRoles(props: {roles: Role[], onChosenRoleRemoved: (roleId: string) => void}) {
  const chosenRoles = props.roles
  const options = chosenRoles.map((role) => (
    <div className="justify-content-around">
      <Row id={role.id} xs="auto" className="my-2 justify-content-between">
        <Col>
          <div className="p-2 border rounded">
            {role.name}
          </div>
        </Col>
        <Col>
          <Button className="p-2" variant="danger" onClick={e => props.onChosenRoleRemoved(role.id)}>
            -
          </Button>
        </Col>
      </Row>
    </div>
  ));

  return (
    <div>
      {options.length ? options : (<div className="text-secondary">No chosen roles</div>)}
    </div>
  );
}

function SelectRoles(props: {roles: Role[], onSelectedChosen: (roleId: string) => void}) {
  const unchosenRoles = props.roles;
  const [index, setIndex] = useState(0);

  const getIdByIndex = (idx: number) => unchosenRoles[idx]?.id ?? ''

  useLayoutEffect(() => {
    setIndex(0)
  }, [])

  const handleClick = () => {
    const roleId = getIdByIndex(index)
    if (roleId) {
      props.onSelectedChosen(roleId)
      setIndex(0)
    }
  }

  const options = unchosenRoles.map((role, i) => (
    <option selected={role.id == getIdByIndex(index)} value={i} id={role.id}>
      {role.name}
    </option>
  ));

  return (
    <div className="mb-3">
      <Row xs="auto" className="g-2 justify-content-between">
        <Col xs={9}>
          <Form.Select
            id="roles"
            name="roles"
            value={index}
            onChange={(event) => {
              {setIndex(+event.target.value);}
            }}
            disabled={unchosenRoles.length == 0}
          >
            {options}
          </Form.Select>
        </Col>
        <Col>
          <Button variant="primary" onClick={handleClick} disabled={unchosenRoles.length == 0}>
            +
          </Button>
        </Col>
      </Row>
    </div>
  );
}

function ChangeRoleForm(props: { userId: string }) {
  const navigate = useNavigate();
  const userId = props.userId;
  const [error, setError] = useState("");
  const [roles, setRoles] = useState(new Array<Role>());
  const [user, setUser] = useState({} as unknown as User);
  const [currentRoles, setCurrentRoles] = useState(new Array<Role>());
  const [unchosenRoles, setUnchosenRoles] = useState(new Array<Role>());

  useEffect(() => {
    async function fetchApi() {
      const userData = await getUser(userId);
      setCurrentRoles(userData.roles);
      setUser(userData);

      const roles = await getRoles();
      setRoles(roles);
      setUnchosenRoles(roles.filter(r => !userData.roles.map(cr => cr.id).includes(r.id)))
      if (roles.length == 0) {
        setError("We don't have any roles.");
      }
    }

    fetchApi();
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const data: Changes = {userId: userId, roles: currentRoles.map(r => r.id)}
    const result = await updateRoles(data);
    const error = result?.error ?? "";

    if (error) {
      setError(error);
    } else {
      navigate("/users");
    }
  };

  const removeChosenRole = (roleId: string) => {
    setCurrentRoles(currentRoles.filter(r => r.id != roleId))
    const role = roles.find(r => r.id == roleId)!
    setUnchosenRoles(unchosenRoles.concat([role]))
  }

  const choseSelectedRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId)!
    const chosenRoles = currentRoles.concat([role])
    setCurrentRoles(chosenRoles)
    setUnchosenRoles(roles.filter(r => !chosenRoles.map(cr => cr.id).includes(r.id)))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className="text-danger">
        <h6>{error}</h6>
      </div>
      <div>
        <h6>Nickname: {user.nickName}</h6>
      </div>
      <Form.Group className="mb-3" controlId="formBasicRole">
        <Form.Label>Available roles: </Form.Label>
        <SelectRoles roles={unchosenRoles} onSelectedChosen={choseSelectedRole} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCurrentRole">
        <Form.Label>Chosen roles:</Form.Label>
        <ChosenRoles roles={currentRoles} onChosenRoleRemoved={removeChosenRole} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
}

export default ChangeRoleForm;
