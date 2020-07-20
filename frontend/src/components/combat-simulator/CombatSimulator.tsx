import React, { FC, useState } from 'react';

import { CombatExecutor } from './CombatExecutor';
import { PlayerInfo, Player } from './PlayerInfo';

import './CombatSimulator.scss';

export const CombatSimulator: FC = () => {
    const defaultPlayer = {
        damage: 12,
        defense: 1,
        dodge: 2,
        health: 60,
        hit: 10,
        keep: 0,
    };

    const [playerOne, setPlayerOne] = useState<Player>({
        ...defaultPlayer,
        name: 'Player One',
    });
    const [playerTwo, setPlayerTwo] = useState<Player>({
        ...defaultPlayer,
        name: 'Player Two',
    });

    return (
        <div className='combat-simulator'>
            <PlayerInfo
                stats={playerOne}
                setStats={setPlayerOne}
            />
            <CombatExecutor
                playerOne={playerOne}
                playerTwo={playerTwo}
            />
            <PlayerInfo
                stats={playerTwo}
                setStats={setPlayerTwo}
            />
        </div>
    );
};
