// components/Alert.tsx
import React from "react";

interface AlertProps {
    type: "success" | "error";
    message: string;
    onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
    return (
        <div
            className={`flex items-center justify-between px-4 py-3 rounded-lg mb-4 ${
                type === "success"
                    ? "bg-green-100 border border-green-400 text-green-700"
                    : "bg-red-100 border border-red-400 text-red-700"
            }`}
        >
            <span>{message}</span>
            <button
                onClick={onClose}
                className="text-sm font-bold text-gray-700 hover:text-gray-900"
            >
                ✖
            </button>
        </div>
    );
};

export default Alert;
