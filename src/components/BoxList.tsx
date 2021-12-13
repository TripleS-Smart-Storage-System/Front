import React from 'react';
import { Row, Table } from 'react-bootstrap';
import { Box, Warehouse } from '../types';
import { getWarehouse, getWarehouseBoxes, getWarehouses } from '../Utils/Api';
import NoElements from './NoElements';

class BoxList extends React.Component<{warehouseId: string}, {boxes: Box[], warehouse: Warehouse}> {
    constructor(props: {warehouseId: string}) {
        super(props);
        this.state = {
            boxes: new Array<Box>(),
            warehouse: {} as Warehouse
        }
    }
  
    async componentDidMount() {
        const boxes = await getWarehouseBoxes(this.props.warehouseId);
        const warehouse = await getWarehouse(this.props.warehouseId)
        this.setState({boxes: boxes, warehouse: warehouse});
    }

    render() {
      const boxes = this.state.boxes;
      const warehouse = this.state.warehouse;

      const tbody = boxes.map((b, i) => (
        <tr>
            <td>{i + 1}</td>
            <td>{b?.supplyProduct.product.name ?? ''}</td>
            <td>{b?.countLeft ?? ''}</td>
            <td>{b?.supplyProduct.product.unit.name ?? ''}</td>
            <td>{new Date(b?.spoilDate ?? '').toLocaleString()}</td>
        </tr>
      ));

      return (
        <div>
            <div>
                <h6>{warehouse?.address ?? ''}</h6>
            </div>
            <Row xs={1} className="g-4 mt-0">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Left</th>
                            <th>Unit</th>
                            <th>Spoil date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tbody}
                    </tbody>
                </Table>
            </Row>

            {(boxes.length == 0) && (
                <NoElements text="No boxes"/>
            )}
        </div>
      );
     }
}

export default BoxList;