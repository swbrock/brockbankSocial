import React from "react";

interface SliderProps {
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    step: number;
    label: string;
}

const WheelSlider: React.FC<SliderProps> = ({
    value,
    onChange,
    min,
    max,
    step,
    label,
}) => {
    return (
        <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
                {label}
            </label>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
                <span>{min}</span>
                <span>{value.toFixed(1)}</span>
                <span>{max}</span>
            </div>
        </div>
    );
};

export default WheelSlider;
