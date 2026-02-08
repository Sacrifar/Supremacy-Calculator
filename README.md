# Supremacy Calculator

A web-based calculator for guild progression tracking in *Guild Supremacy* — a guild-based competitive game mode. Track rankings, calculate mission points, and plan your Gliphshade difficulty unlocks.

## Features

### Current Points Tracking
- Enter your guild's current Supremacy points to see projected totals
- Data is automatically saved in your browser for quick access

### Daily Rankings
Track points from two daily competitive modes:

| Mode | Max Points | Description |
|------|------------|-------------|
| **Supreme Arena** | 4,140 | Daily arena competition with tiered rewards |
| **Dream Realm** | 2,860 | Daily realm-based competition |

Each mode has 5 ranking tiers (Top 20, Top 50, Top 100, Top 200, Top 500) with different point rewards and member limits.

### Weekly Rankings
Track points from two weekly competitive modes:

| Mode | Max Points | Description |
|------|------------|-------------|
| **Honor Duel** | 3,600 | Weekly 1v1 duel competition |
| **Arcane Labyrinth** | 3,600 | Weekly dungeon progression event |

### Daily Missions
Log completion of daily missions that award bonus points:

- **Arena / Supreme Arena** — 80 points (up to 20 members)
- **Dream Realm** — 80 points (up to 20 members)
- **Honor Duel** — 300 points (up to 3 members)
- **Arcane Labyrinth** — 300 points (up to 3 members)

### Gliphshade Difficulty Planner
See which Gliphshade difficulty levels are unlocked based on your projected points. Difficulty levels 1-25 require progressively more Pass Supremacy points, starting from 0 and scaling up to 385,000 points.

### Guild Size Configuration
Set your guild's member count to accurately calculate eligible participants for each ranking tier.

## How It Works

1. **Set Guild Members** — Input how many members are in your guild
2. **Enter Current Points** — Add your existing Supremacy points
3. **Select Rankings** — Choose achieved tiers for each game mode
4. **Complete Missions** — Check off daily missions as completed
5. **View Projection** — See your total calculated points and unlocked difficulties

All data persists in browser local storage, so your progress is saved between sessions.

## Tech Stack

- **React** — UI framework
- **TypeScript** — Type-safe development
- **Vite** — Build tool and dev server

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

Created by Sacrifar
Server G439