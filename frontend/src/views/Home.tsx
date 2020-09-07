import React, { FC } from 'react';

import Logo from '../assets/logo_full_outline_black.svg'

import './Home.scss';

export const Home: FC = () => {
    return (
        <div className='container primary-header'>
            <Logo />
        </div>
    );
};
