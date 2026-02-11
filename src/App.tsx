import { useState, lazy, Suspense } from 'react';
import { useSupremacyCalc } from './hooks/useSupremacyCalc';
import { Header } from './components/Header';
import { GlyphshadeSection } from './components/GlyphshadeSection';
import { DAILY_MODES, WEEKLY_MODES, DAILY_MISSIONS } from './data/gameData';
import './App.css';

// Lazy-load below-the-fold and non-critical components to improve FCP
const EventTimer = lazy(() => import('./components/EventTimer').then(m => ({ default: m.EventTimer })));
const RankingsSection = lazy(() => import('./components/RankingsSection').then(m => ({ default: m.RankingsSection })));
const MissionsSection = lazy(() => import('./components/MissionsSection').then(m => ({ default: m.MissionsSection })));
const SpeedInsights = lazy(() => import('@vercel/speed-insights/react').then(m => ({ default: m.SpeedInsights })));
const Analytics = lazy(() => import('@vercel/analytics/react').then(m => ({ default: m.Analytics })));

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

        <Suspense fallback={null}>
          <EventTimer
            eventEndDate={eventEndDate}
            onEventEndDateChange={setEventEndDate}
          />
        </Suspense>

        <GlyphshadeSection
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

        <Suspense fallback={null}>
          <RankingsSection
            title="Daily Rankings"
            subtitle="Points awarded daily based on rank"
            modes={DAILY_MODES}
            getRankingValue={getRankingValue}
            updateRanking={updateRanking}
            accentColor="#4ecdc4"
            isArenaClosed={isArenaClosed}
          />

          <RankingsSection
            title="Weekly Rankings"
            subtitle="Points awarded weekly based on rank"
            modes={WEEKLY_MODES}
            getRankingValue={getRankingValue}
            updateRanking={updateRanking}
            accentColor="#ff6b6b"
          />

          <MissionsSection
            missions={DAILY_MISSIONS}
            getMissionValue={getMissionValue}
            updateMission={updateMission}
          />
        </Suspense>

        <footer className="app-footer">
          <p>Created by Sacrifar • Supremacy Calculator • Data automatically saved in browser</p>
        </footer>
        <Suspense fallback={null}>
          <SpeedInsights />
          <Analytics />
        </Suspense>
      </div>
    </div>
  );
}

export default App;

