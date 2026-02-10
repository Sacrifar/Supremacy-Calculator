import type { GameMode } from '../types';

/**
 * Calculates the total points for a specific game mode, considering:
 * 1. Cumulative points per tier (higher tiers include points from lower tiers)
 * 2. Cumulative member capping (higher-tier members occupy slots in lower tiers)
 * 3. Max points cap
 *
 * Example: Dream Realm with input [6, 2, 7, 4, 9]:
 *   Cumulative members:  [6, 8, 15, 19, 28]
 *   Capped at maxMembers: [4, 8, 12, 15, 20]
 *   Effective per tier:   [4, 4,  4,  3,  5]
 *   Points: 4×305 + 4×205 + 4×125 + 3×65 + 5×25 = 2860
 */
export function calculateModePoints(
    mode: GameMode,
    getRankingValue: (tierIndex: number) => number
): number {
    // Calculate cumulative points for each tier (tier points + all lower tier points)
    // A person in Top 20 earns: Top20 pts + Top50 pts + Top100 pts + Top200 pts + Top500 pts
    const cumulativePoints = mode.tiers.map((_, tierIndex) => {
        return mode.tiers.slice(tierIndex).reduce((sum, t) => sum + t.points, 0);
    });

    // Get the raw input values for each tier
    const rawValues = mode.tiers.map((_, index) => getRankingValue(index));

    // Calculate cumulative member counts (running total from top tier down)
    // Higher-tier members automatically occupy slots in lower tiers
    const cumulativeMembers: number[] = [];
    let runningTotal = 0;
    for (let i = 0; i < mode.tiers.length; i++) {
        runningTotal += rawValues[i];
        cumulativeMembers.push(runningTotal);
    }

    // Cap cumulative totals at each tier's maxMembers
    // maxMembers represents the TOTAL members that can contribute at that tier level
    const cappedCumulative = cumulativeMembers.map((total, i) =>
        Math.min(total, mode.tiers[i].maxMembers)
    );

    // Calculate effective members per tier (differential of capped cumulative)
    const effectiveMembers = cappedCumulative.map((capped, i) =>
        i === 0 ? capped : Math.max(0, capped - cappedCumulative[i - 1])
    );

    // Calculate total points using cumulative points and effective members
    const totalPoints = effectiveMembers.reduce((total, members, index) => {
        return total + members * cumulativePoints[index];
    }, 0);

    return mode.maxPoints ? Math.min(totalPoints, mode.maxPoints) : totalPoints;
}
