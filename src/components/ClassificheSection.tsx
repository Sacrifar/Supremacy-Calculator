import { useState } from 'react';
import type { GameMode } from '../types';
import { InputCounter } from './InputCounter';
import { calculateModePoints } from '../utils/calculations';
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
    const [showInfo, setShowInfo] = useState(false);

    const calculateModeTotal = (mode: GameMode): number => {
        return calculateModePoints(mode, (tierIndex) => getRankingValue(mode.id, tierIndex));
    };

    const isModeAtMax = (mode: GameMode): boolean => {
        return mode.tiers.every((tier, index) => getRankingValue(mode.id, index) === tier.maxMembers);
    };

    const handleToggleMax = (mode: GameMode) => {
        const setToZero = isModeAtMax(mode);
        mode.tiers.forEach((tier, index) => {
            updateRanking(mode.id, index, setToZero ? 0 : tier.maxMembers);
        });
    };

    return (
        <section className="classifiche-section" style={{ '--accent-color': accentColor } as React.CSSProperties}>
            <div className="section-header">
                <div>
                    <h2 className="section-title">
                        {title}
                        <button
                            className="info-btn"
                            onClick={() => setShowInfo(!showInfo)}
                            aria-label="Info"
                        >
                            ℹ
                        </button>
                    </h2>
                    <p className="section-subtitle">{subtitle}</p>
                    {showInfo && (
                        <p className="info-message">
                            ⚠️ Exceeding members are automatically moved to lower tiers
                        </p>
                    )}
                </div>
            </div>

            <div className="modes-grid">
                {modes.map((mode) => (
                    <div key={mode.id} className="mode-card">
                        <div className="mode-header">
                            <h3 className="mode-title">{mode.name}</h3>
                            <button
                                className={`max-btn ${isModeAtMax(mode) ? 'active' : ''}`}
                                onClick={() => handleToggleMax(mode)}
                                title="Set all tiers to maximum"
                            >
                                MAX
                            </button>
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
