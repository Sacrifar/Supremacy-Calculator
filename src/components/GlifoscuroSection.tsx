import { GLIFOSCURO_REQUIREMENTS } from '../data/gameData';
import './GlifoscuroSection.css';

interface GlifoscuroSectionProps {
    projectedPoints: number;
    currentPoints: number;
    dailyPoints: number;
    weeklyPoints: number;
    eventEndDate: Date;
}

export function GlifoscuroSection({
    projectedPoints,
    currentPoints,
    dailyPoints,
    weeklyPoints,
    eventEndDate
}: GlifoscuroSectionProps) {
    // Calculate unlock date for a difficulty
    const calculateUnlockDate = (requiredPoints: number): Date | null => {
        if (currentPoints >= requiredPoints) {
            return null; // Already unlocked
        }

        const pointsNeeded = requiredPoints - currentPoints;
        if (dailyPoints <= 0) return null;

        // Average points per day (weekly points / 7 + daily points)
        const avgPointsPerDay = dailyPoints + (weeklyPoints / 7);
        const daysNeeded = Math.ceil(pointsNeeded / avgPointsPerDay);

        const unlockDate = new Date();
        unlockDate.setDate(unlockDate.getDate() + daysNeeded);

        // Check if within event period
        if (unlockDate > eventEndDate) {
            return null; // Won't unlock during event
        }

        return unlockDate;
    };

    // Format date as dd/mm
    const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${day}/${month}`;
    };

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
                    <h2 className="section-title">Glyphshade Requirements</h2>
                    <p className="section-subtitle">Unlock new difficulties by accumulating Supremacy Pass</p>
                </div>
            </div>

            <div className="glifoscuro-content">
                <div className="unlock-status-card">
                    <div className="unlock-header">
                        <div className="current-unlock">
                            <span className="unlock-label">Difficulty Unlocked</span>
                            <span className="unlock-value">{unlockedDifficulty}</span>
                        </div>
                        <div className="points-display">
                            <span className="points-label">Supremacy Pass</span>
                            <span className="points-value">{projectedPoints.toLocaleString()}</span>
                        </div>
                    </div>

                    {nextUnlock && (
                        <div className="next-unlock">
                            <div className="progress-info">
                                <span>Next unlock: <strong>Difficulty {nextUnlock.difficulty}</strong></span>
                                <span className="points-needed">
                                    <strong>{nextUnlock.pointsNeeded.toLocaleString()}</strong> points needed
                                </span>
                            </div>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${getProgress()}%` }}
                                />
                            </div>
                            <div className="progress-target">
                                Goal: {nextUnlock.requiredPoints.toLocaleString()} points
                            </div>
                        </div>
                    )}

                    {!nextUnlock && (
                        <div className="max-unlocked">
                            🎉 All difficulties unlocked!
                        </div>
                    )}
                </div>

                <div className="difficulties-grid">
                    {GLIFOSCURO_REQUIREMENTS.map((req) => {
                        const isUnlocked = projectedPoints >= req.requiredPoints;
                        const isCurrentlyUnlocked = currentPoints >= req.requiredPoints;
                        const isCurrent = req.difficulty === unlockedDifficulty;
                        const isNext = nextUnlock && req.difficulty === nextUnlock.difficulty;
                        // Show unlock date for difficulties not yet unlocked with current points
                        const unlockDate = !isCurrentlyUnlocked ? calculateUnlockDate(req.requiredPoints) : null;

                        return (
                            <div
                                key={req.difficulty}
                                className={`difficulty-card ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''} ${isNext ? 'next' : ''}`}
                            >
                                <span className="difficulty-number">{req.difficulty}</span>
                                <span className="difficulty-req">
                                    {req.requiredPoints === 0
                                        ? 'Free'
                                        : req.requiredPoints.toLocaleString()}
                                </span>
                                {isUnlocked && <span className="check-icon">✓</span>}
                                {unlockDate && (
                                    <span className="unlock-date">📅 {formatDate(unlockDate)}</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
