"use client";
import { SportsEvents } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AddBookModal from "../addEvents/AddBookModal";
import { useRouter } from "next/navigation";

interface SportPageProps {
    sportEvents: SportsEvents[];
}

const SportPage: React.FC<SportPageProps> = ({ sportEvents }) => {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    //when the show modal closes, refresh the page
    useEffect(() => {
        if (!showModal) {
            router.refresh();
        }
    }, [showModal, router]);

    return (
        <div className="p-8 bg-gradient-to-r from-red-300 via-rose-200 to-orange-100 min-h-screen">
            {showModal && (
                <AddPrediction
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                />
            )}
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                        Sports Hub
                    </h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-200"
                    >
                        + Add Prediction
                    </button>
                </div>
                {sportEvents && sportEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sportEvents.map((event, index) => (
                            //Add sports Event Cards
                            <Link key={event.id} href={`/sport/${event.id}`}>
                                <div className="relative p-6 bg-white shadow-xl rounded-xl border-2 border-transparent hover:border-teal-400 transition-transform duration-300 hover:scale-105">
                                    <div className="absolute top-2 right-2 bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                                        {event.awayTeam}
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                                        {event.homeTeam}
                                    </h2>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center mt-20">
                        No sporting events to show.
                    </p>
                )}
            </div>
        </div>
    );
};

export default SportPage;
