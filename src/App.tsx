import { useSupremacyCalc } from './hooks/useSupremacyCalc';
import { Header } from './components/Header';
import { ClassificheSection } from './components/ClassificheSection';
import { MissioniSection } from './components/MissioniSection';
import { GlifoscuroSection } from './components/GlifoscuroSection';
import { DAILY_MODES, WEEKLY_MODES, DAILY_MISSIONS } from './data/gameData';
import './App.css';

function App() {
  const {
    guildSize,
    setGuildSize,
    currentPoints,
    setCurrentPoints,
    updateRanking,
    updateMission,
    getRankingValue,
    getMissionValue,
    calculatePoints,
    resetAll,
  } = useSupremacyCalc();

  const points = calculatePoints();

  return (
    <div className="app">
      <div className="app-container">
        <Header
          points={points}
          currentPoints={currentPoints}
          setCurrentPoints={setCurrentPoints}
          onReset={resetAll}
        />

        <GlifoscuroSection projectedPoints={currentPoints + points.total} />

        <div className="guild-size-section">
          <label className="guild-size-label">
            <span>Guild Members:</span>
            <input
              type="number"
              className="guild-size-input"
              value={guildSize}
              onChange={(e) => setGuildSize(Math.max(1, parseInt(e.target.value) || 1))}
              min={1}
              max={100}
            />
          </label>
        </div>

        <ClassificheSection
          title="Daily Rankings"
          subtitle="Points awarded daily based on rank"
          modes={DAILY_MODES}
          getRankingValue={getRankingValue}
          updateRanking={updateRanking}
          accentColor="#4ecdc4"
        />

        <ClassificheSection
          title="Weekly Rankings"
          subtitle="Points awarded weekly based on rank"
          modes={WEEKLY_MODES}
          getRankingValue={getRankingValue}
          updateRanking={updateRanking}
          accentColor="#ff6b6b"
        />

        <MissioniSection
          missions={DAILY_MISSIONS}
          getMissionValue={getMissionValue}
          updateMission={updateMission}
        />



        <footer className="app-footer">
          <p>Supremacy Calculator • Data automatically saved in browser</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
