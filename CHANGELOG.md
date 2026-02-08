# Changelog

## [1.1.0] - 2026-02-08

### Added
- **Projection Toggles in Header**: Added interactive buttons (1D, 7D, ALL) to switch the main projection display between Daily Rate, Weekly Rate, and Event Total.
- **Glyphshade Unlock Dates**: Added estimated unlock dates for future Glyphshade difficulty levels based on current point accumulation rate.
- **Mobile Info Button**: Added a clickable info button (?) to the Rankings section to explain tier demotion rules, replacing hover-only tooltips for better mobile support.

### Changed
- **MAX Button Behavior**:
  - Buttons now act as toggles: First click sets to max, second click resets to zero.
  - Added visual feedback: Buttons are filled/colored when active (at max) and outlined when inactive.
  - Fixed layout shifts: Buttons no longer jump or resize when values change (added fixed widths to headers).
- **Event Timer Calculation**:
  - Synced countdown timer with Game Server time (UTC) for better accuracy.
  - Fixed Date Picker timezone issue where selecting a date would shift it by a day due to UTC conversion.
  - Adjusted Date Picker input width for a cleaner look.
- **Header Layout**:
  - Reorganized "Current Points" section.
  - Improved "Points Breakdown" to clearly dissociate Daily/Weekly rates from total remaining points.
