<<<<<<< HEAD
import { GameMode } from '../types';
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
        return mode.tiers.reduce((total, tier, index) => {
            return total + getRankingValue(mode.id, index) * tier.points;
        }, 0);
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
                                <span className="mode-total-value">{calculateModeTotal(mode).toLocaleString()}</span>
                                <span className="mode-total-label">punti</span>
                            </div>
                        </div>

                        <div className="tiers-list">
                            {mode.tiers.map((tier, index) => (
                                <div key={index} className="tier-row">
                                    <div className="tier-info">
                                        <span className="tier-position">{tier.position}</span>
                                        <span className="tier-points">+{tier.points} pts</span>
                                    </div>
                                    <InputCounter
                                        value={getRankingValue(mode.id, index)}
                                        onChange={(value) => updateRanking(mode.id, index, value)}
                                        max={tier.maxMembers}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
=======
import { GameMode } from '../types';
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
        return mode.tiers.reduce((total, tier, index) => {
            return total + getRankingValue(mode.id, index) * tier.points;
        }, 0);
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
                                <span className="mode-total-value">{calculateModeTotal(mode).toLocaleString()}</span>
                                <span className="mode-total-label">punti</span>
                            </div>
                        </div>

                        <div className="tiers-list">
                            {mode.tiers.map((tier, index) => (
                                <div key={index} className="tier-row">
                                    <div className="tier-info">
                                        <span className="tier-position">{tier.position}</span>
                                        <span className="tier-points">+{tier.points} pts</span>
                                    </div>
                                    <InputCounter
                                        value={getRankingValue(mode.id, index)}
                                        onChange={(value) => updateRanking(mode.id, index, value)}
                                        max={tier.maxMembers}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
>>>>>>> 63bda0097aa53704e45ece885226d943243d993e
