import { useState, useEffect } from "react";

interface SportsEvent {
  id: number;
  sport: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  time: string;
}

interface SportsPrediction {
  sportsEventId: number;
  homeScore: number;
  awayScore: number;
}

const SportsPredictionsPage = () => {
  const [events, setEvents] = useState<SportsEvent[]>([]);
  const [predictions, setPredictions] = useState<{ [key: number]: SportsPrediction }>({});
  const userId = "user123"; // Replace with actual user ID from auth

  useEffect(() => {
    // Fetch sports events
    fetch("/api/sports-events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));

    // Fetch user predictions
    fetch(`/api/sports-predictions?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const predictionsMap = data.reduce((acc: any, pred: SportsPrediction) => {
          acc[pred.sportsEventId] = pred;
          return acc;
        }, {});
        setPredictions(predictionsMap);
      })
      .catch((err) => console.error("Error fetching predictions:", err));
  }, []);

  const handlePredictionChange = (eventId: number, field: "homeScore" | "awayScore", value: number) => {
    setPredictions((prev) => ({
      ...prev,
      [eventId]: { ...prev[eventId], [field]: value, sportsEventId: eventId },
    }));
  };

  const handleSubmit = (eventId: number) => {
    const prediction = predictions[eventId];
    if (!prediction) return;

    fetch(`/api/sports-predictions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, ...prediction }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Prediction saved:", data))
      .catch((err) => console.error("Error submitting prediction:", err));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sports Predictions</h1>
      {events.map((event) => (
        <div key={event.id} className="border p-4 mb-4 rounded">
          <div className="flex items-center gap-4">
            {event.homeTeamLogo && <img src={event.homeTeamLogo} alt={event.homeTeam} className="h-10" />}
            <span className="font-bold">{event.homeTeam}</span> vs.
            {event.awayTeamLogo && <img src={event.awayTeamLogo} alt={event.awayTeam} className="h-10" />}
            <span className="font-bold">{event.awayTeam}</span>
          </div>
          <p className="text-sm text-gray-600">{new Date(event.time).toLocaleString()}</p>
          <div className="flex gap-2 mt-2">
            <input
              type="number"
              placeholder="Home Score"
              value={predictions[event.id]?.homeScore || ""}
              onChange={(e) => handlePredictionChange(event.id, "homeScore", Number(e.target.value))}
              className="border p-1 rounded w-16"
            />
            <input
              type="number"
              placeholder="Away Score"
              value={predictions[event.id]?.awayScore || ""}
              onChange={(e) => handlePredictionChange(event.id, "awayScore", Number(e.target.value))}
              className="border p-1 rounded w-16"
            />
            <button
              onClick={() => handleSubmit(event.id)}
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SportsPredictionsPage;
