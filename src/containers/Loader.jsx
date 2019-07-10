import React from 'react';
import { connect } from 'react-redux'; 


const Loader = ({loader}) => (
  <div className={`loader ${loader ? 'show' : 'hide'}`}>
    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  </div>
);


export default connect((state) => ({loader: state.mainReducer.loader}))(Loader);