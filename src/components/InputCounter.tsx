import './InputCounter.css';

interface InputCounterProps {
    value: number;
    onChange: (value: number) => void;
    max: number;
    limit?: number;
    label?: string;
}

export function InputCounter({ value, onChange, max, limit, label }: InputCounterProps) {
    const effectiveLimit = limit !== undefined ? limit : max;

    const handleDecrement = () => {
        if (value > 0) {
            onChange(value - 1);
        }
    };

    const handleIncrement = () => {
        if (value < effectiveLimit) {
            onChange(value + 1);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value) || 0;
        onChange(Math.min(Math.max(0, newValue), effectiveLimit));
    };

    return (
        <div className="input-counter">
            {label && <span className="counter-label">{label}</span>}
            <div className="counter-controls">
                <button
                    className="counter-btn decrement"
                    onClick={handleDecrement}
                    disabled={value <= 0}
                >
                    −
                </button>
                <input
                    type="number"
                    className="counter-input"
                    value={value}
                    onChange={handleInputChange}
                    min={0}
                    max={effectiveLimit}
                />
                <button
                    className="counter-btn increment"
                    onClick={handleIncrement}
                    disabled={value >= effectiveLimit}
                >
                    +
                </button>
            </div>
            <span className="counter-max">max {max}</span>
        </div>
    );
}
