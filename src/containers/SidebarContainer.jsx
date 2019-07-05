import React from 'react';

const SidebarContainer = (props) => (
  <aside className="sidebar">
    {props.children}
  </aside>
);

export default SidebarContainer;