import axios from 'axios';
import React from 'react';
import config from '../config'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Navigate } from "react-router-dom";
import { PencilFill, TrashFill} from 'react-bootstrap-icons';
import { Unit } from '../types';

export interface Product {
    id: string;
    name: string;
    description: string;
    shelfLife: string;
    unit: Unit;
}

class ProductList extends React.Component<{}, {products: Product[]}> {
    constructor(props: any) {
        super(props);
        this.state = {
            products: new Array<Product>()
        }
        this.onClickRemove = this.onClickRemove.bind(this);
        this.getProducts = this.getProducts.bind(this);
    }
  
    async componentDidMount() {
        const products = await this.getProducts();
        this.setState({products: products});
    }
  
    async getProducts() {
        const response = await axios.get<Product[]>(config.serverUrl + '/Product/products');
        const products: Product[] = response.data;
        return products;
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
            <Card.Img variant="top" src="https://s3.amazonaws.com/thissnackdoesnotexist.com/tofu-597228_1920.jpg" />
            <Card.Body>
                <Card.Title>{p.name}</Card.Title>
                <Card.Text>
                    <Row>
                        <Col xs={10}>
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
                        </Col>
                        <Col xs={2} className="justify-content-between">
                            <Row className="mb-4">
                                <PencilFill />
                            </Row>
                            <Row className="mt-4">
                                <TrashFill onClick={e => {this.onClickRemove(p.id)}} />
                            </Row>
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