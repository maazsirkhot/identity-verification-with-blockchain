import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SideBar(navigationMenu) {
  return (
    <div className="sidebar">
      <div className="menu">
        <ul>
          {navigationMenu.sidebar.map((menu) => (
            <li>
              <NavLink to={menu.navigation} activeClassName={menu.activeClass}>
                <span>
                  <i className={menu.icon} />
                </span>
                <span className="nav-text">{menu.item}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
