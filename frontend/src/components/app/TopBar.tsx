import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import './TopBar.scss';

export const TopBar: FC = () => (
    <div className='topbar'>
        <nav className='nav-items'>
            <NavLink exact
                to='/'
                className='home-link'
            >
                Chronicle
            </NavLink>
        </nav>
        <nav className='nav-items'>
            <NavLink exact to='/about'>
                About
            </NavLink>
            <NavLink exact to='/combat'>
                Combat Simulator
            </NavLink>
        </nav>
    </div>
);
