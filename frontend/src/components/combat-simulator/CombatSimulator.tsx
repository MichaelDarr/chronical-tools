import React, { FC, useState } from 'react';

import { CombatExecutor } from './CombatExecutor';
import { PlayerInfo, PlayerStats } from './PlayerInfo';

import './CombatSimulator.scss';

export const CombatSimulator: FC = () => {
    const initialPlayerStats = {
        damage: 12,
        defense: 1,
        dodge: 2,
        health: 60,
        hit: 10,
        keep: 0,
    };

    const [playerOne, setPlayerOne] = useState<PlayerStats>(initialPlayerStats);
    const [playerTwo, setPlayerTwo] = useState<PlayerStats>(initialPlayerStats);

    return (
        <div className='combat-simulator'>
            <PlayerInfo
                name='Player One'
                stats={playerOne}
                setStats={setPlayerOne}
            />
            <CombatExecutor
                playerOne={{
                    ...initialPlayerStats,
                    name: 'Player One',
                }}
                playerTwo={{
                    ...initialPlayerStats,
                    name: 'Player Two',
                }}
            />
            <PlayerInfo
                name='Player Two'
                stats={playerTwo}
                setStats={setPlayerTwo}
            />
        </div>
    );
};
