"use client";

import React, { useState, useEffect } from "react";
import { MovieQuotes, Scriptures } from "@/lib/quotes";

const QuoteBoard = () => {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [response, setResponse] = useState("");

  // Function to get a random quote from MovieQuotes or Scriptures
  const getRandomQuote = () => {
    const dayOfWeek = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    let selectedRange = dayOfWeek === 0 ? Scriptures : MovieQuotes; // Scriptures for Sunday, Movies for other days

    const randomIndex = Math.floor(Math.random() * selectedRange.length);
    return selectedRange[randomIndex]; // Return object matching { title, response }
  };

  useEffect(() => {
    setLoading(true);
    const quoteData = getRandomQuote();
    setTitle(quoteData.title);
    setResponse(quoteData.response);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full w-full bg-gray-100 rounded-lg p-6">
        <p className="text-gray-500">Loading...</p>
      </div>
    ); // Display a centered loading message
  }

  if (!title || !response) {
    return (
      <div className="flex justify-center items-center h-full w-full bg-gray-100 rounded-lg p-6">
        <p className="text-gray-500">No quotes available.</p>
      </div>
    ); // Centered fallback message
  }

  return (
    <div className="flex flex-col justify-center items-center h-full w-full bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Quote of the Day</h2>
      <div className="text-center">
        <p className="text-indigo-600 font-semibold">{title}</p>
        <p className="text-gray-700 mt-3 italic">{response}</p>
      </div>
    </div>
  );
};

export default QuoteBoard;
