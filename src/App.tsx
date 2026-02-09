import { useState } from 'react';
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

export type ProjectionMode = 'event' | 'daily' | 'weekly';

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
    saveDataToFile,
    loadDataFromFile,
  } = useSupremacyCalc();

  const [projectionMode, setProjectionMode] = useState<ProjectionMode>('event');

  const points = calculatePoints();
  const eventPoints = calculateEventTotal();

  // Check if Supreme Arena is closed (Monday or Tuesday in UTC)
  const now = new Date();
  const isArenaClosed = now.getUTCDay() === 1 || now.getUTCDay() === 2;

  // Calculate projected points based on projection mode
  const dailyRate = eventPoints.dailyRankings + eventPoints.dailyMissions;
  const weeklyRate = (dailyRate * 7) + eventPoints.weeklyRankings;

  const getProjectedPoints = (): number => {
    switch (projectionMode) {
      case 'daily':
        return currentPoints + dailyRate;
      case 'weekly':
        return currentPoints + weeklyRate;
      case 'event':
      default:
        return currentPoints + eventPoints.eventTotal;
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <Header
          points={points}
          eventPoints={eventPoints}
          currentPoints={currentPoints}
          setCurrentPoints={setCurrentPoints}
          onReset={resetAll}
          onSaveData={saveDataToFile}
          onLoadData={loadDataFromFile}
          projectionMode={projectionMode}
          setProjectionMode={setProjectionMode}
        />

        <EventTimer
          eventEndDate={eventEndDate}
          onEventEndDateChange={setEventEndDate}
        />

        <GlifoscuroSection
          projectedPoints={getProjectedPoints()}
          currentPoints={currentPoints}
          arenaPoints={eventPoints.arenaPoints}
          dreamRealmPoints={eventPoints.dreamRealmPoints}
          dailyMissions={eventPoints.dailyMissions}
          weeklyPoints={eventPoints.weeklyRankings}
          eventEndDate={eventEndDate}
          projectionMode={projectionMode}
        />

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
          isArenaClosed={isArenaClosed}
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

