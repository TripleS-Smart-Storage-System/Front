import axios from 'axios';
import React from 'react';
import config from '../config'
import empty from '../empty.png'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link, Navigate } from "react-router-dom";
import { PencilFill, TrashFill} from 'react-bootstrap-icons';
import { User } from '../types';

class UserList extends React.Component<{}, {users: User[]}> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: new Array<User>()
        }
        this.onClickRemove = this.onClickRemove.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }
  
    async componentDidMount() {
        const users = await this.getUsers();
        this.setState({users: users});
    }
  
    async getUsers() {
        const response = await axios.get<User[]>(config.serverUrl + '/User/users');
        const users: User[] = response.data;
        return users;
    }

    async onClickRemove(userId: string) {
        let error = '';
        await axios.delete(config.serverUrl + '/User', {params: {'id': userId}}).then(
            response => {
                if (response.status < 200 || response.status >= 300) {
                    error = response.statusText;
                }
            }
        );
        await this.componentDidMount();
    }

    render() {
      const users = this.state.users; 

      const userList = users.map(p => (
        <Col>
            <Card id={p.id} className="user-area">
            <Card.Body>
                <Card.Title>
                    <Row xs="auto" className="justify-content-between">
                        <Col>
                            {p.name} {p.surName}
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <Link to={`edit/${p.id}`}>
                                        <PencilFill />
                                    </Link>
                                </Col>
                                <Col>
                                    <TrashFill color="red" onClick={e => {this.onClickRemove(p.id)}} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text>
                    <Row>
                        <Col>
                            <div className="p-2 m-1 border rounded">
                                Nickname: {p.nickName}
                            </div>
                        </Col>
                    </Row>
                    <Row xs="auto" className="justify-content-between">
                        <Col>
                            <div className="p-2 m-1 border rounded">
                                Roles: {p.roles.map(r => r.name)}
                            </div>
                        </Col>
                    </Row>
                </Card.Text>
            </Card.Body>
            </Card>
        </Col>
      ));

      return (
        <div>
            {(users.length == 0) && (
                <NoElements text="No users"/>
            )}
            
            <Row xs={1} md={2} className="g-4 mt-0 user-list">
                {userList}
            </Row>
        </div>
      );
     }
}

function NoElements(props: {text: string}) {
    return (
        <div className="mh-100">
            <h2 className="text-secondary text-center py-5">{props.text}</h2>
        </div>
    );
}

export default UserList;