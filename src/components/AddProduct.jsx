import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductForm from './ProductForm';
import { addProduct } from '../actions/apiCalls';

class AddProduct extends Component {

  submit = (e, data) => {
    e.preventDefault();
    let confirmValue = window.confirm('Dodać produkt?');
    if(confirmValue) {
      this.props.addProduct(data).then((data) => {
        if(data && data.status) {
          this.props.history.push(`/panel/${data.id}/products`);
        }
      });
    }
  }
  

  render() {
    return (
      <ProductForm title="Dodaj produkt" submit={this.submit}/>
    )
  }
}

export default connect(null , {addProduct})(AddProduct);