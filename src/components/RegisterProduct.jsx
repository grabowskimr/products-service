import React, { Component } from "react";
import { connect } from 'react-redux';

import Input from '../containers/Input';
import Box from '../containers/Box';
import { addUserProduct } from '../actions/apiCalls';

class RegisterProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '',
      vin: '',
      orderDate: ''
    }
  }

  register = (e) => {
    e.preventDefault();
    let data = {
      ...this.state,
      userId: this.props.userId
    };
    this.props.addUserProduct(data);
  }

  changeFormData = (e) => {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value
    })
  }
  
  changeDate = (date) => {
    this.setState({
      orderDate: date
    })
  }

  render() {
    return (
      <Box title="Zarejestruj produkt">
        <form onSubmit={this.register}>
          <Input type="select" placeholder="Produkt" label="Produkt" name="productId" options={this.props.products} value={this.state.productId} onChange={this.changeFormData} required/>
          <Input type="date" label="Data zakupu" value={this.state.orderDate} onChange={this.changeDate} placeholder="Data" required />
          <Input type="text" placeholder="Numer vin" label="Numer vin" name="vin" value={this.state.vin} onChange={this.changeFormData} required/>
          <button type="submit">Dodaj</button>
        </form>
      </Box>
    )
  }
}

function mapStateToProps(state) {
  return {
    userId: state.mainReducer.userId,
    products: state.mainReducer.products
  }
}

export default connect(mapStateToProps, {addUserProduct})(RegisterProduct);
