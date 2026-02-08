import type { PointsSummary, EventPointsSummary } from '../types';
import './Header.css';

interface HeaderProps {
    points: PointsSummary;
    eventPoints: EventPointsSummary;
    currentPoints: number;
    setCurrentPoints: (value: number) => void;
    onReset: () => void;
}

export function Header({ points, eventPoints, currentPoints, setCurrentPoints, onReset }: HeaderProps) {
    const projectedTotal = currentPoints + eventPoints.eventTotal;

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
                    <div className="total-label">Event Total Projection</div>
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
                    <span className="calculated-label">Event Points ({eventPoints.daysRemaining} days):</span>
                    <span className="calculated-value">+{eventPoints.eventTotal.toLocaleString()}</span>
                </div>
            </div>

            <div className="points-breakdown">
                <div className="breakdown-item">
                    <span className="breakdown-label">Daily (×{eventPoints.daysRemaining})</span>
                    <span className="breakdown-value daily">{eventPoints.totalDailyPoints.toLocaleString()}</span>
                </div>
                <div className="breakdown-item">
                    <span className="breakdown-label">Weekly (×{eventPoints.weeksRemaining.toFixed(1)})</span>
                    <span className="breakdown-value weekly">{eventPoints.totalWeeklyPoints.toLocaleString()}</span>
                </div>
                <div className="breakdown-item">
                    <span className="breakdown-label">Per Day</span>
                    <span className="breakdown-value missions">{points.total.toLocaleString()}</span>
                </div>
            </div>
        </header>
    );
}

