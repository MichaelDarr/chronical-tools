interface Player {
    damage: number;
    defense: number;
    dodge: number;
    health: number;
    hit: number;
    keep: number;
    name: string;
}

declare function Fight(
    playerOne: PlayerStats,
    playerTwo: PlayerStats,
    logEvent: (string) => void,
): string;
