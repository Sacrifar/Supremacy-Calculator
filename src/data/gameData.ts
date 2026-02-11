// Game data constants for Supremacy Calculator
import type { GameMode, Mission } from '../types';

// Event end date (configurable - set to your event end date)
// Format: Date.UTC(year, month (0-indexed), day, hour, minute, second)
export const EVENT_END_DATE = new Date(Date.UTC(2026, 2, 4, 23, 59, 59)); // March 4, 2026 23:59:59 UTC


export const DAILY_MODES: GameMode[] = [
    {
        id: 'arena-suprema',
        name: 'Supreme Arena',
        type: 'daily',
        maxPoints: 4140,
        tiers: [
            { position: 'Top 20', maxMembers: 4, points: 120 },
            { position: 'Top 50', maxMembers: 10, points: 100 },
            { position: 'Top 100', maxMembers: 12, points: 80 },
            { position: 'Top 200', maxMembers: 15, points: 60 },
            { position: 'Top 500', maxMembers: 20, points: 40 },
        ],
    },
    {
        id: 'regno-onirico',
        name: 'Dream Realm',
        type: 'daily',
        maxPoints: 3020,
        tiers: [
            { position: 'Top 20', maxMembers: 4, points: 100 },
            { position: 'Top 50', maxMembers: 10, points: 80 },
            { position: 'Top 100', maxMembers: 12, points: 60 },
            { position: 'Top 200', maxMembers: 15, points: 40 },
            { position: 'Top 500', maxMembers: 20, points: 25 },
        ],
    },
];

export const WEEKLY_MODES: GameMode[] = [
    {
        id: 'duello-onore',
        name: "Honor Duel",
        type: 'weekly',
        maxPoints: 3600,
        tiers: [
            { position: 'Top 20', maxMembers: 3, points: 100 },
            { position: 'Top 50', maxMembers: 5, points: 100 },
            { position: 'Top 100', maxMembers: 7, points: 100 },
            { position: 'Top 200', maxMembers: 9, points: 100 },
            { position: 'Top 500', maxMembers: 12, points: 100 },
        ],
    },
    {
        id: 'labirinto-arcano',
        name: 'Arcane Labyrinth',
        type: 'weekly',
        maxPoints: 3600,
        tiers: [
            { position: 'Top 20', maxMembers: 3, points: 100 },
            { position: 'Top 50', maxMembers: 5, points: 100 },
            { position: 'Top 100', maxMembers: 7, points: 100 },
            { position: 'Top 200', maxMembers: 9, points: 100 },
            { position: 'Top 500', maxMembers: 12, points: 100 },
        ],
    },
];

export const DAILY_MISSIONS: Mission[] = [
    { id: 'mission-arena', name: 'Arena / Supreme Arena', points: 80, maxMembers: 20 },
    { id: 'mission-regno', name: 'Dream Realm', points: 80, maxMembers: 20 },
    { id: 'mission-duello', name: "Honor Duel", points: 300, maxMembers: 3 },
    { id: 'mission-labirinto', name: 'Arcane Labyrinth', points: 300, maxMembers: 3 },
];

export const ALL_MODES = [...DAILY_MODES, ...WEEKLY_MODES];

// Glyphshade unlock requirements (Supremacy Pass points needed for each difficulty)
export interface GlyphshadeRequirement {
    difficulty: number;
    requiredPoints: number;
}

export const GLYPHSHADE_REQUIREMENTS: GlyphshadeRequirement[] = [
    { difficulty: 1, requiredPoints: 0 },
    { difficulty: 2, requiredPoints: 10000 },
    { difficulty: 3, requiredPoints: 20000 },
    { difficulty: 4, requiredPoints: 30000 },
    { difficulty: 5, requiredPoints: 40000 },
    { difficulty: 6, requiredPoints: 50000 },
    { difficulty: 7, requiredPoints: 60000 },
    { difficulty: 8, requiredPoints: 70000 },
    { difficulty: 9, requiredPoints: 80000 },
    { difficulty: 10, requiredPoints: 90000 },
    { difficulty: 11, requiredPoints: 105000 },
    { difficulty: 12, requiredPoints: 120000 },
    { difficulty: 13, requiredPoints: 135000 },
    { difficulty: 14, requiredPoints: 150000 },
    { difficulty: 15, requiredPoints: 165000 },
    { difficulty: 16, requiredPoints: 180000 },
    { difficulty: 17, requiredPoints: 200000 },
    { difficulty: 18, requiredPoints: 220000 },
    { difficulty: 19, requiredPoints: 240000 },
    { difficulty: 20, requiredPoints: 260000 },
    { difficulty: 21, requiredPoints: 285000 },
    { difficulty: 22, requiredPoints: 310000 },
    { difficulty: 23, requiredPoints: 335000 },
    { difficulty: 24, requiredPoints: 360000 },
    { difficulty: 25, requiredPoints: 385000 },
];
