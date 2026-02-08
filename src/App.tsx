import { useSupremacyCalc } from './hooks/useSupremacyCalc';
import { Header } from './components/Header';
import { ClassificheSection } from './components/ClassificheSection';
import { MissioniSection } from './components/MissioniSection';
import { GlifoscuroSection } from './components/GlifoscuroSection';
import { EventTimer } from './components/EventTimer';
import { DAILY_MODES, WEEKLY_MODES, DAILY_MISSIONS } from './data/gameData';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

function App() {
  const {
    guildSize,
    setGuildSize,
    currentPoints,
    setCurrentPoints,
    eventEndDate,
    setEventEndDate,
    updateRanking,
    updateMission,
    getRankingValue,
    getMissionValue,
    calculatePoints,
    calculateEventTotal,
    resetAll,
  } = useSupremacyCalc();

  const points = calculatePoints();
  const eventPoints = calculateEventTotal();

  return (
    <div className="app">
      <div className="app-container">
        <Header
          points={points}
          eventPoints={eventPoints}
          currentPoints={currentPoints}
          setCurrentPoints={setCurrentPoints}
          onReset={resetAll}
        />

        <EventTimer
          eventEndDate={eventEndDate}
          onEventEndDateChange={setEventEndDate}
        />

        <GlifoscuroSection projectedPoints={currentPoints + eventPoints.eventTotal} />

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
          <p>Created by Sacrifar • Supremacy Calculator • Data automatically saved in browser</p>
        </footer>
        <SpeedInsights />
        <Analytics />
      </div>
    </div>
  );
}

export default App;

