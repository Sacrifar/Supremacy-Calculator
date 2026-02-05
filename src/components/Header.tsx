import type { PointsSummary } from '../types';
import './Header.css';

interface HeaderProps {
    points: PointsSummary;
    currentPoints: number;
    setCurrentPoints: (value: number) => void;
    onReset: () => void;
}

export function Header({ points, currentPoints, setCurrentPoints, onReset }: HeaderProps) {
    const projectedTotal = currentPoints + points.total;

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo-section">
                    <div className="logo-icon">⚔️</div>
                    <div className="logo-text">
                        <h1>Supremacy Calculator</h1>
                        <p>Calculate your guild points</p>
                    </div>
                </div>

                <div className="total-section">
                    <div className="total-label">Projected Points</div>
                    <div className="total-value">{projectedTotal.toLocaleString()}</div>
                    <button className="reset-btn" onClick={onReset}>
                        🔄 Reset
                    </button>
                </div>
            </div>

            <div className="current-points-section">
                <label className="current-points-label">
                    <span>Current Points:</span>
                    <input
                        type="number"
                        className="current-points-input"
                        value={currentPoints}
                        onChange={(e) => setCurrentPoints(Math.max(0, parseInt(e.target.value) || 0))}
                        min={0}
                    />
                </label>
                <div className="calculated-points">
                    <span className="calculated-label">Calculated Points:</span>
                    <span className="calculated-value">+{points.total.toLocaleString()}</span>
                </div>
            </div>

            <div className="points-breakdown">
                <div className="breakdown-item">
                    <span className="breakdown-label">Daily Rankings</span>
                    <span className="breakdown-value daily">{points.dailyRankings.toLocaleString()}</span>
                </div>
                <div className="breakdown-item">
                    <span className="breakdown-label">Weekly Rankings</span>
                    <span className="breakdown-value weekly">{points.weeklyRankings.toLocaleString()}</span>
                </div>
                <div className="breakdown-item">
                    <span className="breakdown-label">Daily Missions</span>
                    <span className="breakdown-value missions">{points.dailyMissions.toLocaleString()}</span>
                </div>
            </div>
        </header>
    );
}
