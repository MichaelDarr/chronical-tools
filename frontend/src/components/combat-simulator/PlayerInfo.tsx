import React, { FC } from 'react';

import { NumericInput } from '../ui/input/NumericInput';

import './PlayerInfo.scss';

export interface Player {
    damage: number;
    defense: number;
    dodge: number;
    health: number;
    hit: number;
    keep: number;
    name: string;
}

export interface PlayerInfoProps {
    stats: Player;
    setStats: (stats: Player) => void;
}

export const PlayerInfo: FC<PlayerInfoProps> = ({
    stats,
    setStats,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStats({
            ...stats,
            [e.target.name]: e.target.valueAsNumber,
        })
    };

    return (
        <div className='player-info'>
            <h2>{stats.name}</h2>

            <NumericInput
                label="damage"
                value={stats.damage}
                onInputChange={handleChange}
            />
            <NumericInput
                label="defense"
                value={stats.defense}
                onInputChange={handleChange}
            />
            <NumericInput
                label="dodge"
                value={stats.dodge}
                onInputChange={handleChange}
            />
            <NumericInput
                label="health"
                value={stats.health}
                onInputChange={handleChange}
            />
            <NumericInput
                label="hit"
                value={stats.hit}
                onInputChange={handleChange}
            />
            <NumericInput
                label="keep"
                value={stats.keep}
                onInputChange={handleChange}
            />
        </div>
    );
};
