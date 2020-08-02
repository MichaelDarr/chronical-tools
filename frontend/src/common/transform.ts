import { Keep } from './types';

export function keepString(keep: Keep): string {
    switch (keep) {
        case Keep.Low:
            return 'Low';
        case Keep.Middle:
            return 'Middle';
        case Keep.High:
            return 'High';
        default:
            return 'unknown';
    }
}
