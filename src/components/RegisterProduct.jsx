import React, { Component } from "react";
import { connect } from 'react-redux';

import Input from '../containers/Input';
import Box from '../containers/Box';
import { addUserProduct } from '../actions/apiCalls';
import { host } from '../constants/config';

class RegisterProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '',
      vin: '',
      orderDate: '',
      selectedProduct: {
        id: '',
        name: '',
        image: '',
        properties: {}
      }
    }
  }

  register = (e) => {
    e.preventDefault();
    let data = {
      ...this.state,
      userId: this.props.userId
    };
    this.props.addUserProduct(data).then((data) => {
      if(data.status) {
        this.props.history.push(`/panel/${this.props.userId}/home`);
      }
    });
  }

  changeFormData = (e) => {
    let name = e.target.name;
    this.setState({
      [name]: e.target.value
    })
  }

  changeProduct = (e) => {
    let selectedProduct = this.props.products.find((product) => product.id === e.target.value);
    let name = e.target.name;
    this.setState({
      [name]: e.target.value,
      selectedProduct: {
        id: selectedProduct.id,
        name: selectedProduct.name,
        image: selectedProduct.image,
        properties: JSON.parse(selectedProduct.properties)
      }
    })
  }
  
  changeDate = (date) => {
    this.setState({
      orderDate: date
    })
  }

  render() {
    return (
      <div className="register-product">
        <Box title="Zarejestruj produkt">
          <form onSubmit={this.register}>
            <Input type="select" placeholder="Produkt" label="Produkt" name="productId" options={this.props.products} value={this.state.productId} onChange={this.changeProduct} required/>
            {this.state.selectedProduct && this.state.selectedProduct.image && <div className="product-img">
              <img src={`${host}/${this.state.selectedProduct.image}`} alt="product"/>
            </div>}
            <Input type="date" label="Data zakupu" value={this.state.orderDate} onChange={this.changeDate} placeholder="Data" required />
            <Input type="text" placeholder="Numer fabryczny urządzenia" label="Numer fabryczny urządzenia" name="vin" value={this.state.vin} onChange={this.changeFormData} required/>
            <button type="submit">Dodaj</button>
          </form>
        </Box>
        {this.state.selectedProduct.name && <Box title="Dane">
          {Object.keys(this.state.selectedProduct.properties).map(prop => (
            <div className="product-prop" key={prop}>
              <span className="input-name">{this.state.selectedProduct.properties[prop].name}</span>
              <span className="input-value">{this.state.selectedProduct.properties[prop].value}</span>
            </div>
          ))}
        </Box>}
      </div>
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
