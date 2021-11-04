import '../App.css';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';

const NewProductForm = () => (
  <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Name</Form.Label>
      <Form.Control required type="text" placeholder="Enter name" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Unit</Form.Label>
      <Form.Control required type="text" placeholder="Enter unit" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="newProsuctForm.ControlTextarea">
    <Form.Label>Description</Form.Label>
    <Form.Control required as="textarea" rows={3} />
  </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
);

const NewProduct = () => (
    <div className='newProduct'>
      <h1>New Product</h1>
      <NewProductForm />
    </div>
);

export default NewProduct;