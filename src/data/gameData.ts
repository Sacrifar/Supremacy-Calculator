// Game data constants for Supremacy Calculator
import type { GameMode, Mission } from '../types';

export const DAILY_MODES: GameMode[] = [
    {
        id: 'arena-suprema',
        name: 'Arena Suprema',
        type: 'daily',
        tiers: [
            { position: 'Primi 20', maxMembers: 4, points: 120 },
            { position: 'Primi 50', maxMembers: 10, points: 100 },
            { position: 'Primi 100', maxMembers: 12, points: 80 },
            { position: 'Primi 200', maxMembers: 15, points: 60 },
            { position: 'Primi 500', maxMembers: 20, points: 40 },
        ],
    },
    {
        id: 'regno-onirico',
        name: 'Regno Onirico',
        type: 'daily',
        tiers: [
            { position: 'Primi 20', maxMembers: 4, points: 100 },
            { position: 'Primi 50', maxMembers: 10, points: 80 },
            { position: 'Primi 100', maxMembers: 12, points: 60 },
            { position: 'Primi 200', maxMembers: 15, points: 40 },
            { position: 'Primi 500', maxMembers: 20, points: 25 },
        ],
    },
];

export const WEEKLY_MODES: GameMode[] = [
    {
        id: 'duello-onore',
        name: "Duello d'Onore",
        type: 'weekly',
        tiers: [
            { position: 'Primi 20', maxMembers: 3, points: 100 },
            { position: 'Primi 50', maxMembers: 5, points: 100 },
            { position: 'Primi 100', maxMembers: 7, points: 100 },
            { position: 'Primi 200', maxMembers: 9, points: 100 },
            { position: 'Primi 500', maxMembers: 12, points: 100 },
        ],
    },
    {
        id: 'labirinto-arcano',
        name: 'Labirinto Arcano',
        type: 'weekly',
        tiers: [
            { position: 'Primi 20', maxMembers: 3, points: 100 },
            { position: 'Primi 50', maxMembers: 5, points: 100 },
            { position: 'Primi 100', maxMembers: 7, points: 100 },
            { position: 'Primi 200', maxMembers: 9, points: 100 },
            { position: 'Primi 500', maxMembers: 12, points: 100 },
        ],
    },
];

export const DAILY_MISSIONS: Mission[] = [
    { id: 'mission-arena', name: 'Arena Suprema', points: 80, maxMembers: 20 },
    { id: 'mission-regno', name: 'Regno Onirico', points: 80, maxMembers: 20 },
    { id: 'mission-duello', name: "Duello d'Onore", points: 300, maxMembers: 3 },
    { id: 'mission-labirinto', name: 'Labirinto Arcano', points: 300, maxMembers: 3 },
];

export const ALL_MODES = [...DAILY_MODES, ...WEEKLY_MODES];

// Glifoscuro unlock requirements (Pass Supremazia needed for each difficulty)
export interface GlifoscuroRequirement {
    difficulty: number;
    requiredPoints: number;
}

export const GLIFOSCURO_REQUIREMENTS: GlifoscuroRequirement[] = [
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
