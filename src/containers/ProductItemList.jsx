import React from 'react';
import { Link } from 'react-router-dom';


const ProductItemList = (props) => {
  let product = props.product;
  return (
    <li className="product-item-list">
      <Link to="home" className="product-item" >
        <h4>{product.name}</h4>
        <span>{product.vin}</span>
        <span>{product.order_date}</span>
        <span>{product.wariancy}</span>
        <div className="item-actions">
          <button>Przegląd</button>
          <button>Zgłoś usterke</button>
        </div>
      </Link>
    </li>
  )
}

export default ProductItemList;