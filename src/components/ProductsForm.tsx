import axios from 'axios';
import React from 'react';
import config from '../config'
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface LooseObject {
  [key: string]: any
}

class Input implements LooseObject  {
  name: string = "";
  unit: string = "";
  description: string = "";
}

type NewProductData = Input;

class SignUpForm extends React.Component<{}, { input: LooseObject }> {
  constructor(props: any) {
    super(props);
    this.state = {
      input: new Input(),
    };
  }
          
  render() {
    return (
        <Link to="/products/new" className="btn btn-primary">Add product</Link>
    );
  }
}
  
export default SignUpForm;