import React from 'react';
import ModalImage from "react-modal-image";

import { host } from '../constants/config';
import Label from './Label';

const OrderDetails = (props) => {
  const item = props.item;
  return (
    <div className={`acc-item-content ${item.show && 'show'}`}>
      {item.image && <div className="acc-item-image">
        <ModalImage small={`${host}/${item.image}`} large={`${host}/${item.image}`} alt="Załączone zdjęcie"/>
      </div>}
      <div className="acc-information">
        <div className="acc-row">
          <Label title="Data zgłoszenia" value={item.date}/>
          <Label title="Typ zgłoszenia" value={item.type === 'service' ? 'Serwis' : item.type === 'repair' ? 'Naprawa pogwarancyjna' : item.type === 'parts' ? 'Części' : 'Usterka'}/>
          <Label title="ID zgłoszenia" value={item.record_index ? item.record_index : item.id}/>
          <Label title="Nazwa produktu" value={item.name}/>
        </div>
        {item.type !== 'service' && <div className="acc-row desc">
          <Label title="Tytuł zgłoszenia" value={item.title}/>
          <Label title="Opis" value={item.description}/>
        </div>}
        <div className="acc-row">
          <Label title="Imie i nazwisko" value={`${item.firstname} ${item.lastname}`}/>
          <Label title="Firma" value={item.company ? item.company : 'Osoba Prywatna'}/>
          <Label title="Data Zakupu" value={item.order_date}/>
          <Label title="Gwarancja do" value={item.wariancy}/>
        </div>
        <div className="acc-row">
          <Label title="Numer fabryczny urządzenia" value={item.vin}/>
          <Label title="ID Użytkownika" value={item.user_id}/>
          <Label title="ID Produktu" value={item.product_id}/>
          <Label title="Login" value={item.login}/>
        </div>
        {props.children}
      </div>
    </div>
  );
}

export default OrderDetails;