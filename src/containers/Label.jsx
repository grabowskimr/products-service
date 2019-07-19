import React from 'react';

const Label = ({title, value}) => (
  <div className="label">
    <h3>{title}</h3>
    <span>{value}</span>
  </div>
);

export default Label;