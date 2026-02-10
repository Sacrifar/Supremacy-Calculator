import { GLIFOSCURO_REQUIREMENTS } from '../data/gameData';
import type { ProjectionMode } from '../App';
import './GlifoscuroSection.css';

interface GlifoscuroSectionProps {
    projectedPoints: number;
    currentPoints: number;
    arenaPoints: number;
    dreamRealmPoints: number;
    dailyMissions: number;
    weeklyPoints: number;
    eventEndDate: Date;
    projectionMode: ProjectionMode;
}

export function GlifoscuroSection({
    projectedPoints,
    currentPoints,
    arenaPoints,
    dreamRealmPoints,
    dailyMissions,
    weeklyPoints,
    eventEndDate,
    projectionMode
}: GlifoscuroSectionProps) {
    // Calculate unlock date for a difficulty
    const calculateUnlockDate = (requiredPoints: number): Date | null => {
        if (currentPoints >= requiredPoints) {
            return null; // Already unlocked
        }

        const pointsNeeded = requiredPoints - currentPoints;
        if (arenaPoints + dreamRealmPoints + dailyMissions <= 0) return null;

        // Iterate day by day starting from TODAY.
        // Game resets at 00:00 UTC daily:
        //   - Rankings (SA & Dream Realm) from the PREVIOUS day are awarded at reset
        //     (SA is closed on Mon/Tue, so no arena rankings from those days)
        //   - Weekly rankings are awarded on Monday reset
        //   - Daily missions are earned IMMEDIATELY when completed (same day)
        let accumulatedPoints = 0;
        const now = new Date();
        const startYear = now.getUTCFullYear();
        const startMonth = now.getUTCMonth();
        const startDay = now.getUTCDate();

        for (let day = 0; day < 366; day++) {
            const checkDate = new Date(Date.UTC(startYear, startMonth, startDay + day));
            const dayOfWeek = checkDate.getUTCDay();
            const isMonday = dayOfWeek === 1;

            // Check if this day is still within the event period
            if (checkDate > eventEndDate) break;

            // STEP 1: At daily reset — add ranking points earned the PREVIOUS day
            if (day > 0) {
                const prevDate = new Date(Date.UTC(startYear, startMonth, startDay + day - 1));
                const prevDayOfWeek = prevDate.getUTCDay();
                const prevIsArenaClosed = prevDayOfWeek === 1 || prevDayOfWeek === 2;

                // Dream Realm rankings are awarded every day
                accumulatedPoints += dreamRealmPoints;
                // Arena rankings only if arena was open the previous day
                if (!prevIsArenaClosed) {
                    accumulatedPoints += arenaPoints;
                }
            }

            // STEP 2: Weekly points awarded on Monday reset
            if (isMonday) {
                accumulatedPoints += weeklyPoints;
            }

            // Check if reset-awarded points are enough → unlock happens at this reset
            if (accumulatedPoints >= pointsNeeded) {
                if (checkDate > eventEndDate) return null;
                return checkDate;
            }

            // STEP 3: Daily missions earned IMMEDIATELY during the day
            accumulatedPoints += dailyMissions;

            // Check if missions push us over → unlock happens TODAY (same day)
            if (accumulatedPoints >= pointsNeeded) {
                if (checkDate > eventEndDate) return null;
                return checkDate;
            }
        }

        return null; // Won't unlock during event
    };

    // Format date as dd/mm
    const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        return `${day}/${month}`;
    };

    // Find the highest unlocked difficulty
    // Uses the calendar simulation to ensure consistency with unlock dates
    const getUnlockedDifficulty = (): number => {
        let maxUnlocked = 1;
        for (const req of GLIFOSCURO_REQUIREMENTS) {
            if (currentPoints >= req.requiredPoints) {
                // Already unlocked with current points
                maxUnlocked = req.difficulty;
            } else if (projectedPoints >= req.requiredPoints) {
                // Check if actually achievable before event end via calendar simulation
                const unlockDate = calculateUnlockDate(req.requiredPoints);
                if (unlockDate) {
                    maxUnlocked = req.difficulty;
                } else {
                    break; // Can't reach this in time, stop here
                }
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
        const isAlreadyUnlocked = currentPoints >= next.requiredPoints;
        const unlockDate = !isAlreadyUnlocked ? calculateUnlockDate(next.requiredPoints) : null;
        const unreachable = !isAlreadyUnlocked && !unlockDate && (arenaPoints + dreamRealmPoints + dailyMissions) > 0;
        return {
            difficulty: next.difficulty,
            pointsNeeded: next.requiredPoints - projectedPoints,
            requiredPoints: next.requiredPoints,
            unreachable
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
                            <span className="points-label">
                                Supremacy Pass
                                <span className="projection-indicator">
                                    ({projectionMode === 'daily' ? '1D' : projectionMode === 'weekly' ? '7D' : 'Event'})
                                </span>
                            </span>
                            <span className="points-value">{projectedPoints.toLocaleString()}</span>
                        </div>
                    </div>

                    {nextUnlock && (
                        <div className="next-unlock">
                            <div className="progress-info">
                                <span>Next unlock: <strong>Difficulty {nextUnlock.difficulty}</strong></span>
                                <span className={`points-needed ${nextUnlock.unreachable ? 'unreachable' : ''}`}>
                                    {nextUnlock.unreachable
                                        ? <>⚠️ Not enough time</>
                                        : <><strong>{nextUnlock.pointsNeeded.toLocaleString()}</strong> points needed</>}
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
                        const isCurrentlyUnlocked = currentPoints >= req.requiredPoints;
                        // Show unlock date for difficulties not yet unlocked with current points
                        const unlockDate = !isCurrentlyUnlocked ? calculateUnlockDate(req.requiredPoints) : null;
                        // A difficulty is "unlocked" if already unlocked OR reachable before event end
                        const isUnlocked = isCurrentlyUnlocked || !!unlockDate;
                        const isCurrent = req.difficulty === unlockedDifficulty;
                        const isNext = nextUnlock && req.difficulty === nextUnlock.difficulty;
                        // Check if this difficulty won't be unlockable before event ends
                        const wontUnlock = !isCurrentlyUnlocked && !unlockDate && (arenaPoints + dreamRealmPoints + dailyMissions) > 0;

                        return (
                            <div
                                key={req.difficulty}
                                className={`difficulty-card ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''} ${isNext ? 'next' : ''} ${wontUnlock ? 'unreachable' : ''}`}
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
                                {wontUnlock && (
                                    <span className="unlock-date unreachable">⚠️ N/A</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
