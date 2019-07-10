import React from 'react';

const Box = (props) => (
  <div className={`box ${props.list ? 'list' : null} ${props.size ? 'size-'+props.size : 'size-1'}`}>
    <h3 className="box-title">{props.title}</h3>
    <div className="box-content">
      {props.children}
    </div>
  </div>
);

export default Box;