import React, { FC } from 'react';

import './Combat.scss';

export const Combat: FC = () => {

    const fight = () => alert(`${DemoFight('Marx', 'Engels')} won!`);

    return (
        <div className='container'>
            <h1>Combat Simulator</h1>
            {/* A truly garish FIGHT button */}
            <div className='fight-button-container'>
                <a
                    className='fight-button'
                    onClick={fight}
                >
                    Fight
                </a>
            </div>
        </div>
    );
};
