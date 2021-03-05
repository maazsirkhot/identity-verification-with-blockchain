import React from "react";
import { NavLink } from "react-router-dom";

export default function SideBar(navigationMenu) {
  return (
    <div class="sidebar">
      <div class="menu">
        <ul>
          {navigationMenu.sidebar.map((menu) => {
            return (
              <li>
                <NavLink
                  to={menu.navigation}
                  activeClassName={menu.activeClass}
                >
                  <span>
                    <i class={menu.icon}></i>
                  </span>
                  <span class="nav-text">{menu.item}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
