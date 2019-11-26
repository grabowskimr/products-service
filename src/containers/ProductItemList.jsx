import React from 'react';
import { Link } from 'react-router-dom';


const ProductItemList = (props) => {
  let product = props.product;
  return (
    <li className="product-item-list">
      <div className="product-item" >
        <h4>{product.name}</h4>
        <span>{product.vin}</span>
        <span className="small-column">{product.order_date}</span>
        <span className="small-column">{product.wariancy}</span>
        {props.isAdmin ? 
          <div className="item-actions">
            <button data-product={product.id} onClick={props.changeServiceStatus} disabled={product.status_reqular_fix === '0' ? true : false} className={product.status_reqular_fix === '0' ? 'submited' : ''}>{product.status_reqular_fix === '0' ? 'Brak serwisu' : 'Zmień status'}</button>
            <button data-product={product.id} onClick={props.changeReportStatus} disabled={product.status === '0' ? true : false} className={product.status === '0' ? 'submited' : ''}>{product.status === '0' ? 'Brak usterki' : 'Zmień status usterki'}</button>
            <button data-product={product.id} onClick={props.changeRepairStatus} disabled={product.repair === '0' ? true : false} className={product.repair === '0' ? 'submited' : ''}>{product.repair === '0' ? 'Brak \nzgłoszenia pogwarancyjnego' : 'Zakończ naprawę pogwarancyjna'}</button>
            <button data-product={product.id} onClick={props.changePartsStatus} disabled={product.parts === '0' ? true : false} className={product.parts === '0' ? 'submited' : ''}>{product.parts === '0' ? 'Brak zamówienia części' : 'Zakończ zamawianie części'}</button>
            <Link to={`${props.userId}/product/${product.id}`} className="button dark">Szczegóły</Link>
          </div> :
          <div className="item-actions">
            <Link to={`product/${product.id}/service`} disabled={product.status_reqular_fix === '1' ? true : false} className={`button report-button ${product.status_reqular_fix === '1' ? 'submited' : ''}`}>{product.status_reqular_fix === '1' ? 'Serwis zamówiony' : 'Zamów serwis grawancyjny'}</Link>
            <Link to={`product/${product.id}/report`} disabled={product.status === '1' ? true : false} className={`button report-button ${product.status === '1' ? 'submited' : ''}`}>{product.status === '1' ? 'Usterka zgłoszona' : 'Zgłoś usterke'}</Link>
            <Link to={`product/${product.id}/post-warranty-repair`} disabled={product.repair === '1' ? true : false} className={`button report-button ${product.repair === '1' ? 'submited' : ''}`}>{product.repair === '1' ? 'Naprawa pogwarancyjna zgłoszona' : 'Zgłoś naprawę pogwarancyjna'}</Link>
            <Link to={`product/${product.id}/order-parts`} disabled={product.parts === '1' ? true : false} className={`button report-button ${product.parts === '1' ? 'submited' : ''}`}>{product.parts === '1' ? 'Zamówiono części' : 'Zamów części'}</Link>
            <Link to={`product/${product.id}`} className="button dark">Szczegóły</Link>
          </div>
        }
      </div>
    </li>
  )
}

export default ProductItemList;