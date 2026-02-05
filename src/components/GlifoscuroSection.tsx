import { GLIFOSCURO_REQUIREMENTS } from '../data/gameData';
import './GlifoscuroSection.css';

interface GlifoscuroSectionProps {
    projectedPoints: number;
}

export function GlifoscuroSection({ projectedPoints }: GlifoscuroSectionProps) {
    // Find the highest unlocked difficulty
    const getUnlockedDifficulty = (): number => {
        let maxUnlocked = 1;
        for (const req of GLIFOSCURO_REQUIREMENTS) {
            if (projectedPoints >= req.requiredPoints) {
                maxUnlocked = req.difficulty;
            } else {
                break;
            }
        }
        return maxUnlocked;
    };

    // Find the next difficulty to unlock
    const getNextUnlock = () => {
        const currentMax = getUnlockedDifficulty();
        const next = GLIFOSCURO_REQUIREMENTS.find(r => r.difficulty === currentMax + 1);
        if (!next) return null;
        return {
            difficulty: next.difficulty,
            pointsNeeded: next.requiredPoints - projectedPoints,
            requiredPoints: next.requiredPoints
        };
    };

    const unlockedDifficulty = getUnlockedDifficulty();
    const nextUnlock = getNextUnlock();

    // Calculate progress to next level
    const getProgress = (): number => {
        if (!nextUnlock) return 100;
        const current = GLIFOSCURO_REQUIREMENTS.find(r => r.difficulty === unlockedDifficulty);
        if (!current) return 0;
        const start = current.requiredPoints;
        const end = nextUnlock.requiredPoints;
        const progress = ((projectedPoints - start) / (end - start)) * 100;
        return Math.min(100, Math.max(0, progress));
    };

    return (
        <section className="glifoscuro-section">
            <div className="section-header">
                <div>
                    <h2 className="section-title">Requisiti Glifoscuro</h2>
                    <p className="section-subtitle">Sblocca nuove difficoltà accumulando Pass Supremazia</p>
                </div>
            </div>

            <div className="glifoscuro-content">
                <div className="unlock-status-card">
                    <div className="unlock-header">
                        <div className="current-unlock">
                            <span className="unlock-label">Difficoltà Sbloccata</span>
                            <span className="unlock-value">{unlockedDifficulty}</span>
                        </div>
                        <div className="points-display">
                            <span className="points-label">Pass Supremazia</span>
                            <span className="points-value">{projectedPoints.toLocaleString()}</span>
                        </div>
                    </div>

                    {nextUnlock && (
                        <div className="next-unlock">
                            <div className="progress-info">
                                <span>Prossimo sblocco: <strong>Difficoltà {nextUnlock.difficulty}</strong></span>
                                <span className="points-needed">
                                    Mancano <strong>{nextUnlock.pointsNeeded.toLocaleString()}</strong> punti
                                </span>
                            </div>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${getProgress()}%` }}
                                />
                            </div>
                            <div className="progress-target">
                                Obiettivo: {nextUnlock.requiredPoints.toLocaleString()} punti
                            </div>
                        </div>
                    )}

                    {!nextUnlock && (
                        <div className="max-unlocked">
                            🎉 Hai sbloccato tutte le difficoltà!
                        </div>
                    )}
                </div>

                <div className="difficulties-grid">
                    {GLIFOSCURO_REQUIREMENTS.map((req) => {
                        const isUnlocked = projectedPoints >= req.requiredPoints;
                        const isCurrent = req.difficulty === unlockedDifficulty;
                        const isNext = nextUnlock && req.difficulty === nextUnlock.difficulty;

                        return (
                            <div
                                key={req.difficulty}
                                className={`difficulty-card ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''} ${isNext ? 'next' : ''}`}
                            >
                                <span className="difficulty-number">{req.difficulty}</span>
                                <span className="difficulty-req">
                                    {req.requiredPoints === 0
                                        ? 'Gratis'
                                        : req.requiredPoints.toLocaleString()}
                                </span>
                                {isUnlocked && <span className="check-icon">✓</span>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
