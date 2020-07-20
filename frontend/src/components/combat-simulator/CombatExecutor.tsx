import React, { FC, useState } from 'react';

import { PlayerStats } from './PlayerInfo';

import './CombatExecutor.scss';

export interface FullPlayerInfo extends PlayerStats {
    name: string;
}

export interface PlayerInfoProps {
    playerOne: FullPlayerInfo;
    playerTwo: FullPlayerInfo;
}

export const CombatExecutor: FC<PlayerInfoProps> = ({
    playerOne,
    playerTwo,
}) => {
    const [combatLog, setCombatLog] = useState<string[]>([]);

    const fight = () => {
        setCombatLog([]);
        Fight(playerOne, playerTwo, (logStr: string): void => {
            console.log(logStr)
            setCombatLog(oldArray => [...oldArray, logStr]);
        });
    }

    return (
        <div className='combat-executor'>
            <input
                type='button'
                value='Fight!'
                onClick={fight}
            />
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
