import React, { useState, useEffect } from 'react';
import { formatTimeRemaining, formatNextDailyReset, calculateDaysRemaining } from '../utils/dateUtils';
import './EventTimer.css';

interface EventTimerProps {
    eventEndDate: Date;
    onEventEndDateChange: (date: Date) => void;
}

export function EventTimer({ eventEndDate, onEventEndDateChange }: EventTimerProps) {
    const [timeRemaining, setTimeRemaining] = useState(formatTimeRemaining(eventEndDate));
    const [nextReset, setNextReset] = useState(formatNextDailyReset());
    const [daysRemaining, setDaysRemaining] = useState(calculateDaysRemaining(eventEndDate));

    useEffect(() => {
        const updateTimer = () => {
            setTimeRemaining(formatTimeRemaining(eventEndDate));
            setNextReset(formatNextDailyReset());
            setDaysRemaining(calculateDaysRemaining(eventEndDate));
        };

        // Update every 30 seconds
        const interval = setInterval(updateTimer, 30000);

        // Initial update
        updateTimer();

        return () => clearInterval(interval);
    }, [eventEndDate]);

    // Format date for input (YYYY-MM-DD)
    const formatDateForInput = (date: Date): string => {
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = e.target.value;
        if (dateValue) {
            const [year, month, day] = dateValue.split('-').map(Number);
            const newDate = new Date(Date.UTC(year, month - 1, day, 23, 59, 59));
            onEventEndDateChange(newDate);
        }
    };

    const progressPercentage = Math.max(0, Math.min(100, (1 - daysRemaining / 30) * 100));

    return (
        <div className="event-timer">
            <div className="timer-header">
                <div className="timer-icon">⏱️</div>
                <div className="timer-main">
                    <div className="timer-title">Event ends in</div>
                    <div className="timer-value">{timeRemaining}</div>
                </div>
                <div className="timer-date-picker">
                    <label className="date-picker-label">
                        <span>End Date:</span>
                        <input
                            type="date"
                            className="date-picker-input"
                            value={formatDateForInput(eventEndDate)}
                            onChange={handleDateChange}
                        />
                    </label>
                </div>
            </div>
            <div className="timer-details">
                <div className="timer-detail">
                    <span className="timer-detail-label">Next daily reset:</span>
                    <span className="timer-detail-value">{nextReset}</span>
                </div>
                <div className="timer-detail">
                    <span className="timer-detail-label">Days remaining:</span>
                    <span className="timer-detail-value">{daysRemaining}</span>
                </div>
            </div>
            <div className="timer-progress">
                <div className="timer-progress-bar">
                    <div
                        className="timer-progress-fill"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

