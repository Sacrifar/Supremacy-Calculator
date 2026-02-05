import type { Mission } from '../types';
import { InputCounter } from './InputCounter';
import './MissioniSection.css';

interface MissioniSectionProps {
    missions: Mission[];
    getMissionValue: (missionId: string) => number;
    updateMission: (missionId: string, value: number) => void;
}

export function MissioniSection({
    missions,
    getMissionValue,
    updateMission,
}: MissioniSectionProps) {
    const calculateTotal = (): number => {
        return missions.reduce((total, mission) => {
            return total + getMissionValue(mission.id) * mission.points;
        }, 0);
    };

    return (
        <section className="missioni-section">
            <div className="section-header">
                <div>
                    <h2 className="section-title">Daily Missions</h2>
                    <p className="section-subtitle">Points per member completing the mission</p>
                </div>
                <div className="section-total">
                    <span className="section-total-value">{calculateTotal().toLocaleString()}</span>
                    <span className="section-total-label">total points</span>
                </div>
            </div>

            <div className="missions-grid">
                {missions.map((mission) => {
                    const completed = getMissionValue(mission.id);
                    const missionTotal = completed * mission.points;

                    return (
                        <div key={mission.id} className="mission-card">
                            <div className="mission-info">
                                <h3 className="mission-name">{mission.name}</h3>
                                <div className="mission-points">
                                    <span className="points-per-member">+{mission.points}</span>
                                    <span className="points-label">pts/member</span>
                                </div>
                            </div>

                            <div className="mission-controls">
                                <InputCounter
                                    value={completed}
                                    onChange={(value) => updateMission(mission.id, value)}
                                    max={mission.maxMembers}
                                    label="Members"
                                />
                            </div>

                            <div className="mission-total">
                                <span className="mission-total-value">{missionTotal.toLocaleString()}</span>
                                <span className="mission-total-label">points</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
