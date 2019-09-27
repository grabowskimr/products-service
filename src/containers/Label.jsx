import React from 'react';

const Label = ({title, value, full}) => (
  <div className={`label ${full ? 'full' : ''}`}>
    <h3>{title}</h3>
    <span>{value}</span>
  </div>
);

export default Label;