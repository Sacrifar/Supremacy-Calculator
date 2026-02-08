import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { formatTimeRemaining, formatNextDailyReset, calculateDaysRemaining } from '../utils/dateUtils';
import 'react-datepicker/dist/react-datepicker.css';
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

    const handleDateChange = (date: Date | null) => {
        if (date) {
            // Set to end of day UTC to match game server time (23:59:59 UTC)
            const newDate = new Date(Date.UTC(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                23, 59, 59
            ));
            onEventEndDateChange(newDate);
        }
    };

    const progressPercentage = Math.max(0, Math.min(100, (1 - daysRemaining / 30) * 100));

    // Convert UTC date to local date for display to avoid timezone shifts
    // (e.g. 23:59 UTC displayed as next day in local time)
    const displayDate = new Date(
        eventEndDate.getUTCFullYear(),
        eventEndDate.getUTCMonth(),
        eventEndDate.getUTCDate()
    );

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
                        <DatePicker
                            selected={displayDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            className="date-picker-input"
                            calendarClassName="dark-calendar"
                            minDate={new Date()}
                            showPopperArrow={false}
                            popperPlacement="bottom-end"
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

