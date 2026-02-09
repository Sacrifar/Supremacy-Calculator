// Custom hook for Supremacy Calculator logic
import { useState, useCallback, useEffect } from 'react';
import type { GuildRankData, MissionData, PointsSummary, EventPointsSummary } from '../types';
import { ALL_MODES, DAILY_MODES, WEEKLY_MODES, DAILY_MISSIONS, EVENT_END_DATE } from '../data/gameData';
import { calculateModePoints } from '../utils/calculations';
import { calculateDaysRemaining, calculateWeeklyResetsRemaining, calculateArenaDaysRemaining } from '../utils/dateUtils';

const STORAGE_KEY = 'supremacy-calculator-data';

interface StoredData {
    guildSize: number;
    rankings: GuildRankData[];
    missions: MissionData[];
    currentPoints: number;
    eventEndDate?: string; // ISO string for storage
}

export function useSupremacyCalc() {
    const [guildSize, setGuildSize] = useState(20);
    const [rankings, setRankings] = useState<GuildRankData[]>([]);
    const [missions, setMissions] = useState<MissionData[]>([]);
    const [currentPoints, setCurrentPoints] = useState(0);
    const [eventEndDate, setEventEndDate] = useState<Date>(EVENT_END_DATE);

    // Initialize data
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const data: StoredData = JSON.parse(stored);
                setGuildSize(data.guildSize || 20);
                setRankings(data.rankings || []);
                setMissions(data.missions || []);
                setCurrentPoints(data.currentPoints || 0);
                if (data.eventEndDate) {
                    setEventEndDate(new Date(data.eventEndDate));
                }
            } catch {
                initializeDefaults();
            }
        } else {
            initializeDefaults();
        }
    }, []);

    const initializeDefaults = () => {
        // Initialize rankings with 0 for all tiers
        const defaultRankings: GuildRankData[] = [];
        ALL_MODES.forEach((mode) => {
            mode.tiers.forEach((_, tierIndex) => {
                defaultRankings.push({
                    modeId: mode.id,
                    tierIndex,
                    memberCount: 0,
                });
            });
        });
        setRankings(defaultRankings);

        // Initialize missions with 0
        const defaultMissions: MissionData[] = DAILY_MISSIONS.map((m) => ({
            missionId: m.id,
            completedMembers: 0,
        }));
        setMissions(defaultMissions);
        setCurrentPoints(0);
    };

    // Save to localStorage
    useEffect(() => {
        if (rankings.length > 0) {
            const data: StoredData = {
                guildSize,
                rankings,
                missions,
                currentPoints,
                eventEndDate: eventEndDate.toISOString()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
    }, [guildSize, rankings, missions, currentPoints, eventEndDate]);

    const updateRanking = useCallback(
        (modeId: string, tierIndex: number, memberCount: number) => {
            setRankings((prev) =>
                prev.map((r) =>
                    r.modeId === modeId && r.tierIndex === tierIndex
                        ? { ...r, memberCount: Math.max(0, memberCount) }
                        : r
                )
            );
        },
        []
    );

    const updateMission = useCallback(
        (missionId: string, completedMembers: number) => {
            setMissions((prev) =>
                prev.map((m) =>
                    m.missionId === missionId
                        ? { ...m, completedMembers: Math.max(0, completedMembers) }
                        : m
                )
            );
        },
        []
    );

    const getRankingValue = useCallback(
        (modeId: string, tierIndex: number): number => {
            const ranking = rankings.find(
                (r) => r.modeId === modeId && r.tierIndex === tierIndex
            );
            return ranking?.memberCount || 0;
        },
        [rankings]
    );

    const getMissionValue = useCallback(
        (missionId: string): number => {
            const mission = missions.find((m) => m.missionId === missionId);
            return mission?.completedMembers || 0;
        },
        [missions]
    );

    const calculatePoints = useCallback((): PointsSummary => {
        let dailyRankings = 0;
        let weeklyRankings = 0;
        let dailyMissions = 0;

        const now = new Date();
        const day = now.getUTCDay();
        const isArenaClosed = day === 1 || day === 2; // Monday or Tuesday

        // Calculate daily rankings
        DAILY_MODES.forEach((mode) => {
            if (mode.id === 'arena-suprema' && isArenaClosed) {
                return;
            }
            dailyRankings += calculateModePoints(mode, (tierIndex) =>
                getRankingValue(mode.id, tierIndex)
            );
        });

        // Calculate weekly rankings
        WEEKLY_MODES.forEach((mode) => {
            weeklyRankings += calculateModePoints(mode, (tierIndex) =>
                getRankingValue(mode.id, tierIndex)
            );
        });

        // Calculate daily missions
        DAILY_MISSIONS.forEach((mission) => {
            const completedMembers = getMissionValue(mission.id);
            dailyMissions += completedMembers * mission.points;
        });

        return {
            dailyRankings,
            weeklyRankings,
            dailyMissions,
            total: dailyRankings + weeklyRankings + dailyMissions,
        };
    }, [getRankingValue, getMissionValue]);

    const calculateEventTotal = useCallback((): EventPointsSummary => {
        const points = calculatePoints();
        const daysRemaining = calculateDaysRemaining(eventEndDate);
        const arenaDaysRemaining = calculateArenaDaysRemaining(eventEndDate);
        const weeksRemaining = calculateWeeklyResetsRemaining(eventEndDate);

        // Calculate theoretical daily points separately for projection
        const arenaMode = DAILY_MODES.find(m => m.id === 'arena-suprema');
        const arenaPoints = arenaMode ? calculateModePoints(arenaMode, (tier) => getRankingValue(arenaMode.id, tier)) : 0;

        let otherDailyPoints = 0;
        DAILY_MODES.forEach(mode => {
            if (mode.id !== 'arena-suprema') {
                otherDailyPoints += calculateModePoints(mode, (tier) => getRankingValue(mode.id, tier));
            }
        });

        let missionPoints = 0;
        DAILY_MISSIONS.forEach((mission) => {
            missionPoints += getMissionValue(mission.id) * mission.points;
        });

        // Daily points projection:
        // (Arena Points * Arena Days) + (Other Daily * Total Days) + (Missions * Total Days)
        const totalDailyPoints = Math.round(
            (arenaPoints * arenaDaysRemaining) +
            (otherDailyPoints * daysRemaining) +
            (missionPoints * daysRemaining)
        );

        // Weekly points = weeklyRankings * remaining weeks (fractional)
        // We use points.weeklyRankings because weekly points are not affected by daily closures
        const totalWeeklyPoints = Math.round(points.weeklyRankings * weeksRemaining);

        return {
            ...points,
            daysRemaining,
            weeksRemaining,
            totalDailyPoints,
            totalWeeklyPoints,
            eventTotal: totalDailyPoints + totalWeeklyPoints,
        };
    }, [calculatePoints, eventEndDate, getRankingValue, getMissionValue]);

    const resetAll = useCallback(() => {
        initializeDefaults();
    }, []);

    const saveDataToFile = useCallback(() => {
        const data: StoredData = {
            guildSize,
            rankings,
            missions,
            currentPoints,
            eventEndDate: eventEndDate.toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `supremacy-calculator-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [guildSize, rankings, missions, currentPoints, eventEndDate]);

    const loadDataFromFile = useCallback(() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const data: StoredData = JSON.parse(event.target?.result as string);
                        if (data.guildSize) setGuildSize(data.guildSize);
                        if (data.rankings) setRankings(data.rankings);
                        if (data.missions) setMissions(data.missions);
                        if (data.currentPoints !== undefined) setCurrentPoints(data.currentPoints);
                        if (data.eventEndDate) setEventEndDate(new Date(data.eventEndDate));
                    } catch (error) {
                        console.error('Error loading file:', error);
                        alert('Error loading file. Please make sure it is a valid JSON file.');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }, []);

    return {
        guildSize,
        setGuildSize,
        currentPoints,
        setCurrentPoints,
        eventEndDate,
        setEventEndDate,
        rankings,
        missions,
        updateRanking,
        updateMission,
        getRankingValue,
        getMissionValue,
        calculatePoints,
        calculateEventTotal,
        resetAll,
        saveDataToFile,
        loadDataFromFile,
    };
}
