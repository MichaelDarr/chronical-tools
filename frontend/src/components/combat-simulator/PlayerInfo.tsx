import React, { FC } from 'react';

import { DropdownInput } from '../ui/input/DropdownInput';
import { NumericInput } from '../ui/input/NumericInput';
import { keepString } from '../../common/transform';
import { Keep } from '../../common/types';

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
    // Generic stat change handler, only accepts non-negative stat changes
    const handleStatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.valueAsNumber >= 0) {
            setStats({
                ...stats,
                [e.target.name]: e.target.valueAsNumber,
            });
        }
    };

    // Keep stat change handler, needs different logic because it's a select instead of an input
    const handleKeepChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStats({
            ...stats,
            keep: parseInt(e.target.value),
        });
    };

    return (
        <div className='player-info'>
            <h2>{stats.name}</h2>

            <NumericInput
                label="damage"
                value={stats.damage}
                onInputChange={handleStatChange}
            />
            <NumericInput
                label="defense"
                value={stats.defense}
                onInputChange={handleStatChange}
            />
            <NumericInput
                label="dodge"
                value={stats.dodge}
                onInputChange={handleStatChange}
            />
            <NumericInput
                label="health"
                value={stats.health}
                onInputChange={handleStatChange}
            />
            <NumericInput
                label="hit"
                value={stats.hit}
                onInputChange={handleStatChange}
            />
            <DropdownInput
                label="keep"
                value={stats.keep}
                options={[Keep.Low, Keep.Middle, Keep.High]}
                optionTransformer={keepString}
                onInputChange={handleKeepChange}
            />
        </div>
    );
};
