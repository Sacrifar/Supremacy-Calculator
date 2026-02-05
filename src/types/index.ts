// Types for Supremacy Calculator

export interface RankTier {
  position: string;
  maxMembers: number;
  points: number;
}

export interface GameMode {
  id: string;
  name: string;
  type: 'daily' | 'weekly';
  tiers: RankTier[];
}

export interface Mission {
  id: string;
  name: string;
  points: number;
  maxMembers: number;
}

export interface GuildRankData {
  modeId: string;
  tierIndex: number;
  memberCount: number;
}

export interface MissionData {
  missionId: string;
  completedMembers: number;
}

export interface CalculatorState {
  guildSize: number;
  rankings: GuildRankData[];
  missions: MissionData[];
}

export interface PointsSummary {
  dailyRankings: number;
  weeklyRankings: number;
  dailyMissions: number;
  total: number;
}