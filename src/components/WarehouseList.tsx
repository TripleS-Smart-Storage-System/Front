import React from 'react';
import { Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Warehouse } from '../types';
import { getWarehouses } from '../Utils/Api';
import NoElements from './NoElements';

class WarehouseList extends React.Component<{}, {warehouses: Warehouse[]}> {
    constructor(props: any) {
        super(props);
        this.state = {
            warehouses: new Array<Warehouse>()
        }
    }
  
    async componentDidMount() {
        const warehouses = await getWarehouses();
        this.setState({warehouses: warehouses});
    }

    render() {
      const warehouses = this.state.warehouses;

      const tbody = warehouses.map((w, i) => (
        <tr>
            <td>{i + 1}</td>
            <td><Link to={`${w.id}`} style={{ textDecoration: 'none' }}>{w?.address ?? ''}</Link></td>
            <td>{w?.email ?? ''}</td>
        </tr>
      ));

      return (
        <div>
            <Row xs={1} className="g-4 mt-0">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Address</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tbody}
                    </tbody>
                </Table>
            </Row>

            {(warehouses.length == 0) && (
                <NoElements text="No warehouses"/>
            )}
        </div>
      );
    }
}

export default WarehouseList;