import type { GameMode } from '../types';
import { InputCounter } from './InputCounter';
import './ClassificheSection.css';

interface ClassificheSectionProps {
    title: string;
    subtitle: string;
    modes: GameMode[];
    getRankingValue: (modeId: string, tierIndex: number) => number;
    updateRanking: (modeId: string, tierIndex: number, value: number) => void;
    accentColor: string;
}

export function ClassificheSection({
    title,
    subtitle,
    modes,
    getRankingValue,
    updateRanking,
    accentColor,
}: ClassificheSectionProps) {
    const calculateModeTotal = (mode: GameMode): number => {
        // Calculate cumulative points for each tier (tier points + all lower tier points)
        const cumulativePoints = mode.tiers.map((_, tierIndex) => {
            return mode.tiers.slice(tierIndex).reduce((sum, t) => sum + t.points, 0);
        });

        // Get the raw input values for each tier
        const rawValues = mode.tiers.map((_, index) => getRankingValue(mode.id, index));

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
    };

    return (
        <section className="classifiche-section" style={{ '--accent-color': accentColor } as React.CSSProperties}>
            <div className="section-header">
                <div>
                    <h2 className="section-title">{title}</h2>
                    <p className="section-subtitle">{subtitle}</p>
                </div>
            </div>

            <div className="modes-grid">
                {modes.map((mode) => (
                    <div key={mode.id} className="mode-card">
                        <div className="mode-header">
                            <h3 className="mode-title">{mode.name}</h3>
                            <div className="mode-total">
                                <span className="mode-total-value">
                                    {calculateModeTotal(mode).toLocaleString()}
                                    {mode.maxPoints && <span className="mode-total-cap"> / {mode.maxPoints.toLocaleString()}</span>}
                                </span>
                                <span className="mode-total-label">points</span>
                            </div>
                        </div>

                        <div className="tiers-list">
                            {mode.tiers.map((tier, index) => {
                                const cumulativePoints = mode.tiers
                                    .slice(index)
                                    .reduce((sum, t) => sum + t.points, 0);

                                return (
                                    <div key={index} className="tier-row">
                                        <div className="tier-info">
                                            <span className="tier-position">{tier.position}</span>
                                            <span className="tier-points">+{cumulativePoints} pts</span>
                                        </div>
                                        <InputCounter
                                            value={getRankingValue(mode.id, index)}
                                            onChange={(value) => updateRanking(mode.id, index, value)}
                                            max={tier.maxMembers}
                                            limit={500}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
