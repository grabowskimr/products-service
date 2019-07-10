import React from 'react';

const List = (props) => (
  <ul className="list">
    <li className="title-li">
      {props.titles.map((title, index) => (
        <span key={index} className={`flex-${title.flex ? title.flex : '1'}`}>{title.name}</span>
      ))}
    </li>
    {props.children}
  </ul>
);

export default List;