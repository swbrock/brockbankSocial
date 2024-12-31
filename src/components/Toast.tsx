// components/Toast.tsx
import React, { useEffect } from "react";

interface ToastProps {
    type: "success" | "error";
    message: string;
    onClose: () => void;
    duration?: number; // Duration in milliseconds
}

const Toast: React.FC<ToastProps> = ({
    type,
    message,
    onClose,
    duration = 3000,
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div
            className={`fixed bottom-4 left-4 z-50 px-4 py-3 rounded-lg shadow-lg transition-transform transform ${
                type === "success"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
            }`}
        >
            <div className="flex items-center">
                <span className="flex-grow">{message}</span>
                <button onClick={onClose} className="ml-4 text-white font-bold">
                    ✖
                </button>
            </div>
        </div>
    );
};

export default Toast;
