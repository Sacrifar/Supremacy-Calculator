import { useState } from 'react';
import type { PointsSummary, EventPointsSummary } from '../types';
import './Header.css';

interface HeaderProps {
    points: PointsSummary;
    eventPoints: EventPointsSummary;
    currentPoints: number;
    setCurrentPoints: (value: number) => void;
    onReset: () => void;
    onSaveData: () => void;
    onLoadData: () => void;
}

export function Header({ points, eventPoints, currentPoints, setCurrentPoints, onReset, onSaveData, onLoadData }: HeaderProps) {
    const [projectionMode, setProjectionMode] = useState<'event' | 'daily' | 'weekly'>('event');

    const handleAddDailyPoints = () => {
        const dailyRate = eventPoints.dailyRankings + eventPoints.dailyMissions;
        setCurrentPoints(currentPoints + dailyRate);
    };

    const dailyRate = eventPoints.dailyRankings + eventPoints.dailyMissions;
    const weeklyRate = (dailyRate * 7) + eventPoints.weeklyRankings;

    const getProjectedValue = () => {
        switch (projectionMode) {
            case 'daily':
                return dailyRate;
            case 'weekly':
                return weeklyRate;
            case 'event':
            default:
                return currentPoints + eventPoints.eventTotal;
        }
    };

    const getProjectionLabel = () => {
        switch (projectionMode) {
            case 'daily':
                return 'Daily Projection';
            case 'weekly':
                return 'Weekly Projection';
            case 'event':
            default:
                return 'Event Total Projection';
        }
    };

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
                    <div className="total-header">
                        <div className="total-label">{getProjectionLabel()}</div>
                        <div className="projection-toggles">
                            <button
                                className={`toggle-btn ${projectionMode === 'daily' ? 'active' : ''}`}
                                onClick={() => setProjectionMode('daily')}
                                title="Daily Rate"
                            >1D</button>
                            <button
                                className={`toggle-btn ${projectionMode === 'weekly' ? 'active' : ''}`}
                                onClick={() => setProjectionMode('weekly')}
                                title="Weekly Rate"
                            >7D</button>
                            <button
                                className={`toggle-btn ${projectionMode === 'event' ? 'active' : ''}`}
                                onClick={() => setProjectionMode('event')}
                                title="Event Total"
                            >ALL</button>
                        </div>
                        {projectionMode === 'daily' && (
                            <button
                                className="add-daily-btn"
                                onClick={handleAddDailyPoints}
                                title="Add daily projected points to Current Points"
                            >
                                ➕ Add to Current
                            </button>
                        )}
                    </div>
                    <div className="total-value">{getProjectedValue().toLocaleString()}</div>
                    <button className="reset-btn" onClick={onReset}>
                        🔄 Reset
                    </button>
                </div>
            </div>

            <div className="current-points-section">
                <div className="current-points-row">
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
                    <div className="save-load-buttons">
                        <button
                            className="save-btn"
                            onClick={onSaveData}
                            title="Save current data to file"
                        >
                            💾 Save
                        </button>
                        <button
                            className="load-btn"
                            onClick={onLoadData}
                            title="Load data from file"
                        >
                            📂 Load
                        </button>
                    </div>
                </div>
                <div className="calculated-points">
                    <span className="calculated-label">Remaining Event Points:</span>
                    <span className="calculated-value">+{eventPoints.eventTotal.toLocaleString()}</span>
                </div>
            </div>

            <div className="points-breakdown">
                <div className="breakdown-item">
                    <div>
                        <span className="breakdown-label">Daily Total ({eventPoints.daysRemaining} days)</span>
                        <div className="breakdown-subtext">Based on {eventPoints.daysRemaining} resets</div>
                    </div>
                    <span className="breakdown-value daily">{eventPoints.totalDailyPoints.toLocaleString()}</span>
                </div>
                <div className="breakdown-item">
                    <div>
                        <span className="breakdown-label">Weekly Total ({eventPoints.weeksRemaining.toFixed(1)} wks)</span>
                        <div className="breakdown-subtext">Based on {eventPoints.weeksRemaining.toFixed(1)} resets</div>
                    </div>
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

