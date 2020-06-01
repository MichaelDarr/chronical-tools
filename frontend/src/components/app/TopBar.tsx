import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import './TopBar.scss';

export const TopBar: FC = () => {

    return (
        <div className='topbar'>
            <nav className='nav-items'>
                <NavLink exact to='/'>
                    Home
                </NavLink>
                <NavLink exact to='/about'>
                    About Us
                </NavLink>
                <NavLink exact to='/combat'>
                    Combat Simulator
                </NavLink>
            </nav>
        </div>
    );
};
