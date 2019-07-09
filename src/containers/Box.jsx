import React from 'react';

const Box = (props) => (
  <div className="box">
    <h3 className="box-title">{props.title}</h3>
    <div className="box-content">
      {props.children}
    </div>
  </div>
);

export default Box;