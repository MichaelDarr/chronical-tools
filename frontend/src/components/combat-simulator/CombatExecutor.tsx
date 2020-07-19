import React, { FC } from 'react';

import { PlayerStats } from './PlayerInfo';

import './CombatExecutor.scss';

export interface PlayerInfoProps {
    playerOne: PlayerStats;
    playerTwo: PlayerStats;
}

export const CombatExecutor: FC<PlayerInfoProps> = ({
    playerOne,
    playerTwo,
}) => {
    const fight = () => {
        console.log({playerOne, playerTwo});
    }

    return (
        <div className='player-info'>
            <input
                type='button'
                value='Fight!'
                onClick={fight}
            />
        </div>
    );
};
