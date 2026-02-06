import type { GameMode } from '../types';

/**
 * Calculates the total points for a specific game mode, considering:
 * 1. Cumulative points per tier (higher tiers include points from lower tiers)
 * 2. Overflow logic (excess members in a tier flow down to lower tiers)
 * 3. Max points cap
 */
export function calculateModePoints(
    mode: GameMode,
    getRankingValue: (tierIndex: number) => number
): number {
    // Calculate cumulative points for each tier (tier points + all lower tier points)
    const cumulativePoints = mode.tiers.map((_, tierIndex) => {
        return mode.tiers.slice(tierIndex).reduce((sum, t) => sum + t.points, 0);
    });

    // Get the raw input values for each tier
    const rawValues = mode.tiers.map((_, index) => getRankingValue(index));

    // Apply overflow logic: excess members flow down to lower tiers
    const effectiveMembers: number[] = [];
    let overflow = 0;

    for (let i = 0; i < mode.tiers.length; i++) {
        const tier = mode.tiers[i];
        const totalForTier = rawValues[i] + overflow;

        if (totalForTier > tier.maxMembers) {
            // This tier is over cap, take max and overflow the rest
            effectiveMembers.push(tier.maxMembers);
            overflow = totalForTier - tier.maxMembers;
        } else {
            // This tier fits within cap
            effectiveMembers.push(totalForTier);
            overflow = 0;
        }
    }
    // Note: any remaining overflow after the last tier is lost (no lower tier to go to)

    // Calculate total points using cumulative points and effective members
    const totalPoints = effectiveMembers.reduce((total, members, index) => {
        return total + members * cumulativePoints[index];
    }, 0);

    return mode.maxPoints ? Math.min(totalPoints, mode.maxPoints) : totalPoints;
}
