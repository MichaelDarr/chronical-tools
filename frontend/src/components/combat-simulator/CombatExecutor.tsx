import React, { FC, useState } from 'react';

import { Player } from './PlayerInfo';

import './CombatExecutor.scss';

export interface PlayerInfoProps {
    playerOne: Player;
    playerTwo: Player;
}

export const CombatExecutor: FC<PlayerInfoProps> = ({
    playerOne,
    playerTwo,
}) => {
    const [combatLog, setCombatLog] = useState<string[]>([]);

    const fight = () => {
        setCombatLog([]);
        Fight(playerOne, playerTwo, (logStr: string): void => {
            setCombatLog(oldArray => [...oldArray, logStr]);
        });
    }

    return (
        <div className='combat-executor'>
            <div className='fight-button-container'>
                <input
                    type='button'
                    value='Fight!'
                    onClick={fight}
                />
            </div>
            <div className='combat-log'>
                {combatLog.map((message, idx) => (
                    <p
                        key={idx}
                    >
                        {message}
                    </p>
                ))}
            </div>
        </div>
    );
};
