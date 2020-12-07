import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import './DashboardNav.css';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { SidedrawerData } from './SidedrawerData';

export default function DashboardNav(props) {
  const { logout } = props;
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className="dashboard-nav">
        <a className="menu-bars">
          <MenuIcon onClick={toggleSidebar} />
        </a>
      </div>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <a className="menu-bars">
              <CloseIcon onClick={toggleSidebar} />
            </a>
          </li>
          {SidedrawerData.map((item, index) => {
            return (
              <li key={index} className={item.className}>
                <Link to={item.path}>
                  {item.icon}
                  <span className="item-title">{item.title}</span>
                </Link>
              </li>
            );
          })}
          <li className="drawer-text">
            <Link onClick={logout()}>
              <CloseIcon />
              <span className="item-title">Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
