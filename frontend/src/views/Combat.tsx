import React, { FC } from 'react';

import { CombatSimulator } from '../components/combat-simulator/CombatSimulator';

import './Combat.scss';

export const Combat: FC = () => (
    <div className='container'>
        <CombatSimulator />
    </div>
);
