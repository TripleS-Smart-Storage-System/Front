import React from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { PencilFill, TrashFill} from 'react-bootstrap-icons';
import { Idable, Supply, Warehouse } from '../types';
import { deleteSupply, getSupplies, getWarehouses } from '../Utils/Api';
import NoElements from './NoElements';
import { WithTranslation, withTranslation } from 'react-i18next';

interface IProps extends WithTranslation {
    prop: any;
  }
class SupplyList extends React.Component<IProps, {supplies: Supply[], warehouses: Warehouse[]}> {
    constructor(props: any) {
        super(props);
        this.state = {
            supplies: new Array<Supply>(),
            warehouses: new Array<Warehouse>()
        }
        this.onClickRemove = this.onClickRemove.bind(this);
    }
  
    async componentDidMount() {
        const supplies = await getSupplies();
        const wrehouses = await getWarehouses();
        this.setState({supplies: supplies, warehouses: wrehouses});
    }

    async onClickRemove(productId: string) {
        await deleteSupply(productId);
        await this.componentDidMount();
    }

    getIndexById<T extends Idable>(array: T[], id: string) {
        return array.findIndex(el => el.id == id)
    }

    render() {
      const supplies = this.state.supplies;
      const warehouses = this.state.warehouses;

      const tbody = supplies.map((s, i) => (
        <tr>
            <td>{i + 1}</td>
            <td>{warehouses[this.getIndexById(warehouses, s.wareHouseId)]?.address ?? ''}</td>
            <td>{new Date(s.dateOrdered).toLocaleString()}</td>
            <td>{s.isArrived ? 'Arrived' : 'In progress'}</td>
            <td> 
                {!s.isArrived && (
                    <Row className="justify-content-around" xs="auto">
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
                            <th>{this.props.t('Warehouse')}</th>
                            <th>{this.props.t('Creation date')}</th>
                            <th>{this.props.t('Status')}</th>
                            <th style={{width: '10%'}}></th>
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

export default withTranslation()(SupplyList);