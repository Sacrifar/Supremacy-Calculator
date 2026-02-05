<<<<<<< HEAD
import './InputCounter.css';

interface InputCounterProps {
    value: number;
    onChange: (value: number) => void;
    max: number;
    label?: string;
}

export function InputCounter({ value, onChange, max, label }: InputCounterProps) {
    const handleDecrement = () => {
        if (value > 0) {
            onChange(value - 1);
        }
    };

    const handleIncrement = () => {
        if (value < max) {
            onChange(value + 1);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value) || 0;
        onChange(Math.min(Math.max(0, newValue), max));
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
                    max={max}
                />
                <button
                    className="counter-btn increment"
                    onClick={handleIncrement}
                    disabled={value >= max}
                >
                    +
                </button>
            </div>
            <span className="counter-max">max {max}</span>
        </div>
    );
}
=======
import './InputCounter.css';

interface InputCounterProps {
    value: number;
    onChange: (value: number) => void;
    max: number;
    label?: string;
}

export function InputCounter({ value, onChange, max, label }: InputCounterProps) {
    const handleDecrement = () => {
        if (value > 0) {
            onChange(value - 1);
        }
    };

    const handleIncrement = () => {
        if (value < max) {
            onChange(value + 1);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value) || 0;
        onChange(Math.min(Math.max(0, newValue), max));
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
                    max={max}
                />
                <button
                    className="counter-btn increment"
                    onClick={handleIncrement}
                    disabled={value >= max}
                >
                    +
                </button>
            </div>
            <span className="counter-max">max {max}</span>
        </div>
    );
}
>>>>>>> 63bda0097aa53704e45ece885226d943243d993e
