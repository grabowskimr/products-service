import React, { Component } from "react";
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

import Box from '../containers/Box';
import List from '../containers/List';
import ProductItemList from '../containers/ProductItemList';
import { getUserProducts, changeServiceStatus } from '../actions/apiCalls';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: [
        {name: 'Nazwa', flex: 1},
        {name: 'Numer fabryczny urządzenia', flex: 1},
        {name: 'Data zakupu', flex: 1, additionalClass: 'small-column'},
        {name: 'Gwarancja', flex: 1, additionalClass: 'small-column'},
        {name: 'Akcje', flex: 2}
      ],
      isAdmin: this.props.cookies.get('login').profile === 'admin' ? true : false
    }
  }

  componentDidMount() {
    this.props.getUserProducts(this.props.cookies.get('login').profile === 'admin' ? this.props.userId : this.props.cookies.get('login').id);
  }

  orderService = (e) => {
    let confirmValue = window.confirm('Zgłosić serwis?');
    if(confirmValue) {
      this.props.setStatusService({
        id: e.target.dataset.product,
        userId: this.props.cookies.get('login').id,
        type: 'service',
        status: 1
      });
    }
  }

  changeServiceStatus = (e) => {
    let confirmValue = window.confirm('Zmienić status?');
    if(confirmValue) {
      this.props.changeServiceStatus({
        id: e.target.dataset.product,
        userId: this.props.userId,
        type: 'service',
        status: 0,
        method: 'serviceStatus'
      });
    }
  }

  changeReportStatus = (e) => {
    let confirmValue = window.confirm('Zmienić status?');
    if(confirmValue) {
      this.props.changeServiceStatus({
        id: e.target.dataset.product,
        userId: this.props.userId,
        type: 'report',
        status: 0,
        method: 'reportStatus'
      });
    }
  }

  changeRepairStatus = (e) => {
    let confirmValue = window.confirm('Zmienić status?');
    if(confirmValue) {
      this.props.changeServiceStatus({
        id: e.target.dataset.product,
        userId: this.props.userId,
        type: 'repair',
        status: 0,
        method: 'repairStatus'
      });
    }
  };

  changePartsStatus = (e) => {
    let confirmValue = window.confirm('Zmienić status?');
    if(confirmValue) {
      this.props.changeServiceStatus({
        id: e.target.dataset.product,
        userId: this.props.userId,
        type: 'parts',
        status: 0,
        method: 'partsStatus'
      });
    }
  };

  render() {
    return (
      <Box title="Lista produktów" list size={100}>
        {this.props.userProducts.length ?
        <List titles={this.state.titles} >
          {this.props.userProducts.map(product => {
            if(!product.hidden) {
              return <ProductItemList 
                key={product.id} 
                product={product} 
                orderService={this.orderService} 
                changeServiceStatus={this.changeServiceStatus} 
                changeReportStatus={this.changeReportStatus}
                changeRepairStatus={this.changeRepairStatus}
                changePartsStatus={this.changePartsStatus}
                userId={this.props.userId} 
                isAdmin={this.state.isAdmin} 
              />;
            } else {
              return null;
            }
          })}
        </List> : 
        <h3>Brak produktów</h3>}
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return {
    userProducts: state.mainReducer.userProducts
  }
}

export default connect(mapStateToProps, {getUserProducts, changeServiceStatus})(withCookies(ProductList));
