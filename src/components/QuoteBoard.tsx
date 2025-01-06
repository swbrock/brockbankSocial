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
    let selectedRange = [];

    // Select the appropriate quote range based on the day of the week
    if (dayOfWeek === 0) { // Sunday
      selectedRange = Scriptures; // Scriptures for Sunday
    } else {
      selectedRange = MovieQuotes; // Movies for other days
    }

    // Get a random quote from the selected range
    const randomIndex = Math.floor(Math.random() * selectedRange.length);
    return selectedRange[randomIndex]; // Return object matching { title, response }
  };

  useEffect(() => {
    setLoading(true);
    const quoteData = getRandomQuote();
    setTitle(quoteData.title);
    setResponse(quoteData.response);
    setLoading(false); // Set loading to false after fetching the quote
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>; // Display a loading message
  }

  if (!title || !response) {
    return <p className="text-center text-gray-500">No quotes available.</p>; // Fallback message if no quote is found
  }

  return (
    <div className="p-6 bg-gray-100 shadow-lg rounded-lg flex flex-col items-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Quote of the Day</h2>
      <div className="text-center">
        <p className="text-gray-800 font-medium">{title}</p>
        <p className="text-gray-600 mt-2">{response}</p>
      </div>
    </div>
  );
};

export default QuoteBoard;
