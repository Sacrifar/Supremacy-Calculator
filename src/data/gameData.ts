// Game data constants for Supremacy Calculator
import { GameMode, Mission } from '../types';

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
    { id: 'mission-duello', name: "Duello d'Onore", points: 300, maxMembers: 20 },
    { id: 'mission-labirinto', name: 'Labirinto Arcano', points: 300, maxMembers: 20 },
];

export const ALL_MODES = [...DAILY_MODES, ...WEEKLY_MODES];
