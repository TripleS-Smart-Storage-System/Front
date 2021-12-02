import axios from 'axios';
import React from 'react';
import config from '../config'
import empty from '../images/empty.png'
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { PencilFill, TrashFill} from 'react-bootstrap-icons';
import { Product } from '../types';
import { getProducts } from '../Utils/Api';

class ProductList extends React.Component<{}, {products: Product[]}> {
    constructor(props: any) {
        super(props);
        this.state = {
            products: new Array<Product>()
        }
        this.onClickRemove = this.onClickRemove.bind(this);
    }
  
    async componentDidMount() {
        const products = await getProducts();
        this.setState({products: products});
    }

    async onClickRemove(productId: string) {
        let error = '';
        await axios.delete(config.serverUrl + '/Product', {params: {'id': productId}}).then(
            response => {
                if (response.status < 200 || response.status >= 300) {
                    error = response.statusText;
                }
            }
        );
        await this.componentDidMount();
    }

    render() {
      const products = this.state.products; 

      const productList = products.map(p => (
        <Col>
            <Card id={p.id} className="product-area">
            <Card.Img variant="top" src={empty} />
            <Card.Body>
                <Card.Title>
                    <Row xs="auto" className="justify-content-between">
                        <Col>
                            {p.name}
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
                                Description: {p.description}
                            </div>
                        </Col>
                    </Row>
                    <Row xs="auto" className="justify-content-between">
                        <Col>
                            <div className="p-2 m-1 border rounded">
                                Unit: {p.unit.name}
                            </div>
                        </Col>
                        <Col>
                            <div className="p-2 m-1 border rounded">
                                Shelf life: {p.shelfLife}
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
            {(products.length == 0) && (
                <NoElements text="No products"/>
            )}
            
            <Row xs={1} md={2} className="g-4 mt-0 product-list">
                {productList}
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

export default ProductList;