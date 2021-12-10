import React from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { PencilFill, TrashFill} from 'react-bootstrap-icons';
import { Supply } from '../types';
import { deleteSupply, getSupplies } from '../Utils/Api';

class SupplyList extends React.Component<{}, {supplies: Supply[]}> {
    constructor(props: any) {
        super(props);
        this.state = {
            supplies: new Array<Supply>()
        }
        this.onClickRemove = this.onClickRemove.bind(this);
    }
  
    async componentDidMount() {
        const supplies = await getSupplies();
        this.setState({supplies: supplies});
    }

    async onClickRemove(productId: string) {
        await deleteSupply(productId);
        await this.componentDidMount();
    }

    render() {
      const supplies = this.state.supplies;

      const tbody = supplies.map((s, i) => (
        <tr>
            <td>{i + 1}</td>
            <td>{new Date(s.dateOrdered).toLocaleString()}</td>
            <td>{s.isArrived ? 'Arrived' : 'In progress'}</td>
            <td> 
                {!s.isArrived && (
                    <Row>
                        <Col>
                            <Link to={`edit/${s.id}`}>
                                <PencilFill />
                            </Link>
                        </Col>
                        <Col>
                            <TrashFill color="red" onClick={() => {this.onClickRemove(s.id)}} />
                        </Col>
                    </Row>
                )}
            </td>
        </tr>
      ));

      return (
        <div>
            <Row xs={1} className="g-4 mt-0">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Creation date</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tbody}
                    </tbody>
                </Table>
            </Row>

            {(supplies.length == 0) && (
                <NoElements text="No supplies"/>
            )}
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

export default SupplyList;