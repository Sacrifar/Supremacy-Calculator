import type { PointsSummary } from '../types';
import './Header.css';

interface HeaderProps {
    points: PointsSummary;
    onReset: () => void;
}

export function Header({ points, onReset }: HeaderProps) {
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
                    <div className="total-label">Totale Punti</div>
                    <div className="total-value">{points.total.toLocaleString()}</div>
                    <button className="reset-btn" onClick={onReset}>
                        🔄 Reset
                    </button>
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
