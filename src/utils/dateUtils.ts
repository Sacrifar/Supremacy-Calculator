// Date and time utility functions for event calculations

/**
 * Get current date/time in UTC
 */
export function getCurrentUTCDate(): Date {
    return new Date();
}

/**
 * Get the next daily reset time (00:00 UTC)
 */
export function getNextDailyReset(): Date {
    const now = new Date();
    const nextReset = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + 1,
        0, 0, 0, 0
    ));
    return nextReset;
}

/**
 * Calculate days remaining until event end (capped at 31 days)
 */
export function calculateDaysRemaining(endDate: Date): number {
    const now = getCurrentUTCDate();
    const msPerDay = 24 * 60 * 60 * 1000;
    const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / msPerDay));
    return Math.min(31, daysRemaining); // Cap at 31 days
}

/**
 * Calculate number of daily resets remaining until event end
 * Each daily reset occurs at 00:00 UTC
 */
export function calculateDailyResetsRemaining(endDate: Date): number {
    return calculateDaysRemaining(endDate);
}

/**
 * Calculate number of weekly resets remaining until event end
 * Weekly reset occurs at 00:00 UTC on Monday (between Sunday and Monday)
 */
export function calculateWeeklyResetsRemaining(endDate: Date): number {
    const now = getCurrentUTCDate();

    // Find the next Monday 00:00 UTC
    const getNextMonday = (date: Date): Date => {
        const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0));
        const dayOfWeek = d.getUTCDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
        const daysUntilMonday = dayOfWeek === 0 ? 1 : (8 - dayOfWeek);
        d.setUTCDate(d.getUTCDate() + daysUntilMonday);
        return d;
    };

    // Count Mondays between now and end date
    let count = 0;
    let currentMonday = getNextMonday(now);

    while (currentMonday <= endDate) {
        count++;
        currentMonday.setUTCDate(currentMonday.getUTCDate() + 7);
    }

    return count;
}

/**
 * Format time remaining as "Xd Xh Xm"
 */
export function formatTimeRemaining(endDate: Date): string {
    const now = getCurrentUTCDate();
    const diff = Math.max(0, endDate.getTime() - now.getTime());

    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));

    return `${days}d ${hours}h ${minutes}m`;
}

/**
 * Format time until next daily reset as "Xh Xm"
 */
export function formatNextDailyReset(): string {
    const now = getCurrentUTCDate();
    const nextReset = getNextDailyReset();
    const diff = nextReset.getTime() - now.getTime();

    const hours = Math.floor(diff / (60 * 60 * 1000));
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));

    return `${hours}h ${minutes}m`;
}
