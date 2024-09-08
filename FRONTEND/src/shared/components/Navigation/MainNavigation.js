import React, {useState} from 'react';
import {Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';
import './MainNavigation.css';

const MainNavigation = props =>{

    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawer = () =>{
        return setDrawerIsOpen(true);
    }

    const closeDrawer = () =>{
        return setDrawerIsOpen(false);
    }

    return (
        <React.Fragment>
            {drawerIsOpen && <Backdrop onClick={closeDrawer} />}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            <MainHeader>
                <button class="main-navigation__menu-btn" onClick={openDrawer}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className='main-navigation__title'><Link to="/">My Places</Link></h1>
                <nav className='main-navigation__header-nav'>
                    <NavLinks></NavLinks>
                </nav>
            </MainHeader>
        </React.Fragment>
    )
}

export default MainNavigation;