import React from "react";
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = props => {

    return <ul className="nav-links">
        <li>
            <NavLink to="/" exact >all Users</NavLink>
        </li>
        <li>
            <NavLink to="/places/my-places">My Places</NavLink>
        </li>
        <li>
            <NavLink to="/places/new">New Place</NavLink>
        </li>
        <li>
            <NavLink to="/auth">Authenticate</NavLink>
        </li>
    </ul>
}

export default NavLinks;