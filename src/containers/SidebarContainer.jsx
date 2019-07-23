import React from 'react';

const SidebarContainer = (props) => (
  <aside className={`sidebar ${props.show ? 'show' : ''}`}>
    {props.children}
  </aside>
);

export default SidebarContainer;