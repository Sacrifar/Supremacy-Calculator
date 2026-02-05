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
                        <p>Calcola i punti della tua gilda</p>
                    </div>
                </div>

                <div className="total-section">
                    <div className="total-label">Punti Proiettati</div>
                    <div className="total-value">{projectedTotal.toLocaleString()}</div>
                    <button className="reset-btn" onClick={onReset}>
                        🔄 Reset
                    </button>
                </div>
            </div>

            <div className="current-points-section">
                <label className="current-points-label">
                    <span>Punti Attuali:</span>
                    <input
                        type="number"
                        className="current-points-input"
                        value={currentPoints}
                        onChange={(e) => setCurrentPoints(Math.max(0, parseInt(e.target.value) || 0))}
                        min={0}
                    />
                </label>
                <div className="calculated-points">
                    <span className="calculated-label">Punti Calcolati:</span>
                    <span className="calculated-value">+{points.total.toLocaleString()}</span>
                </div>
            </div>

            <div className="points-breakdown">
                <div className="breakdown-item">
                    <span className="breakdown-label">Classifiche Giornaliere</span>
                    <span className="breakdown-value daily">{points.dailyRankings.toLocaleString()}</span>
                </div>
                <div className="breakdown-item">
                    <span className="breakdown-label">Classifiche Settimanali</span>
                    <span className="breakdown-value weekly">{points.weeklyRankings.toLocaleString()}</span>
                </div>
                <div className="breakdown-item">
                    <span className="breakdown-label">Missioni Giornaliere</span>
                    <span className="breakdown-value missions">{points.dailyMissions.toLocaleString()}</span>
                </div>
            </div>
        </header>
    );
}
