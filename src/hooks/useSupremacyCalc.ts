<<<<<<< HEAD
// Custom hook for Supremacy Calculator logic
import { useState, useCallback, useEffect } from 'react';
import { GuildRankData, MissionData, PointsSummary } from '../types';
import { ALL_MODES, DAILY_MODES, WEEKLY_MODES, DAILY_MISSIONS } from '../data/gameData';

const STORAGE_KEY = 'supremacy-calculator-data';

interface StoredData {
    guildSize: number;
    rankings: GuildRankData[];
    missions: MissionData[];
}

export function useSupremacyCalc() {
    const [guildSize, setGuildSize] = useState(20);
    const [rankings, setRankings] = useState<GuildRankData[]>([]);
    const [missions, setMissions] = useState<MissionData[]>([]);

    // Initialize data
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const data: StoredData = JSON.parse(stored);
                setGuildSize(data.guildSize || 20);
                setRankings(data.rankings || []);
                setMissions(data.missions || []);
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
    };

    // Save to localStorage
    useEffect(() => {
        if (rankings.length > 0) {
            const data: StoredData = { guildSize, rankings, missions };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
    }, [guildSize, rankings, missions]);

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

        // Calculate daily rankings
        DAILY_MODES.forEach((mode) => {
            mode.tiers.forEach((tier, tierIndex) => {
                const memberCount = getRankingValue(mode.id, tierIndex);
                dailyRankings += memberCount * tier.points;
            });
        });

        // Calculate weekly rankings
        WEEKLY_MODES.forEach((mode) => {
            mode.tiers.forEach((tier, tierIndex) => {
                const memberCount = getRankingValue(mode.id, tierIndex);
                weeklyRankings += memberCount * tier.points;
            });
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

    const resetAll = useCallback(() => {
        initializeDefaults();
    }, []);

    return {
        guildSize,
        setGuildSize,
        rankings,
        missions,
        updateRanking,
        updateMission,
        getRankingValue,
        getMissionValue,
        calculatePoints,
        resetAll,
    };
}
=======
// Custom hook for Supremacy Calculator logic
import { useState, useCallback, useEffect } from 'react';
import { GuildRankData, MissionData, PointsSummary } from '../types';
import { ALL_MODES, DAILY_MODES, WEEKLY_MODES, DAILY_MISSIONS } from '../data/gameData';

const STORAGE_KEY = 'supremacy-calculator-data';

interface StoredData {
    guildSize: number;
    rankings: GuildRankData[];
    missions: MissionData[];
}

export function useSupremacyCalc() {
    const [guildSize, setGuildSize] = useState(20);
    const [rankings, setRankings] = useState<GuildRankData[]>([]);
    const [missions, setMissions] = useState<MissionData[]>([]);

    // Initialize data
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const data: StoredData = JSON.parse(stored);
                setGuildSize(data.guildSize || 20);
                setRankings(data.rankings || []);
                setMissions(data.missions || []);
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
    };

    // Save to localStorage
    useEffect(() => {
        if (rankings.length > 0) {
            const data: StoredData = { guildSize, rankings, missions };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }
    }, [guildSize, rankings, missions]);

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

        // Calculate daily rankings
        DAILY_MODES.forEach((mode) => {
            mode.tiers.forEach((tier, tierIndex) => {
                const memberCount = getRankingValue(mode.id, tierIndex);
                dailyRankings += memberCount * tier.points;
            });
        });

        // Calculate weekly rankings
        WEEKLY_MODES.forEach((mode) => {
            mode.tiers.forEach((tier, tierIndex) => {
                const memberCount = getRankingValue(mode.id, tierIndex);
                weeklyRankings += memberCount * tier.points;
            });
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

    const resetAll = useCallback(() => {
        initializeDefaults();
    }, []);

    return {
        guildSize,
        setGuildSize,
        rankings,
        missions,
        updateRanking,
        updateMission,
        getRankingValue,
        getMissionValue,
        calculatePoints,
        resetAll,
    };
}
>>>>>>> 63bda0097aa53704e45ece885226d943243d993e
