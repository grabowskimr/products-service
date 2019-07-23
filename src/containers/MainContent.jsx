import React from 'react';

const MainContent = (props) => (
  <div className="main" onClick={props.hideSidebar}>
    {props.children}
  </div>
);

export default MainContent;
