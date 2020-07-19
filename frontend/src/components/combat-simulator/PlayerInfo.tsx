import React, { FC } from 'react';

import './PlayerInfo.scss';

export interface PlayerStats {
    damage: number;
    defense: number;
    dodge: number;
    health: number;
    hit: number;
    keep: number;
}

export interface PlayerInfoProps {
    name: string;
    stats: PlayerStats;
    setStats: (stats: PlayerStats) => void;
}

export const PlayerInfo: FC<PlayerInfoProps> = ({
    name,
    stats,
    setStats,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStats({
            ...stats,
            [e.target.name]: e.target.valueAsNumber,
        })
    }

    return (
        <div className='player-info'>
            <h2>{name}</h2>
            {Object.entries(stats).map(([key, val]) => (
                <label
                    className='player-info-input'
                    key={key}
                >
                    {key}:
                    <br />
                    <input
                        name={key}
                        type='number'
                        value={val}
                        onChange={handleChange}
                    />
                </label>
            ))}
        </div>
    );
};
