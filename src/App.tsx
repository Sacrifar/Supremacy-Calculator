import { useSupremacyCalc } from './hooks/useSupremacyCalc';
import { Header } from './components/Header';
import { ClassificheSection } from './components/ClassificheSection';
import { MissioniSection } from './components/MissioniSection';
import { DAILY_MODES, WEEKLY_MODES, DAILY_MISSIONS } from './data/gameData';
import './App.css';

function App() {
  const {
    guildSize,
    setGuildSize,
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
        <Header points={points} onReset={resetAll} />

        <div className="guild-size-section">
          <label className="guild-size-label">
            <span>Membri della Gilda:</span>
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
          title="Classifiche Giornaliere"
          subtitle="Punti assegnati ogni giorno in base alla posizione"
          modes={DAILY_MODES}
          getRankingValue={getRankingValue}
          updateRanking={updateRanking}
          accentColor="#4ecdc4"
        />

        <ClassificheSection
          title="Classifiche Settimanali"
          subtitle="Punti assegnati settimanalmente in base alla posizione"
          modes={WEEKLY_MODES}
          getRankingValue={getRankingValue}
          updateRanking={updateRanking}
          accentColor="#ff6b6b"
        />

        <MissioniSection
          missions={DAILY_MISSIONS}
          getMissionValue={getMissionValue}
          updateMission={updateMission}
          guildSize={guildSize}
        />

        <footer className="app-footer">
          <p>Supremacy Calculator • I dati vengono salvati automaticamente nel browser</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
