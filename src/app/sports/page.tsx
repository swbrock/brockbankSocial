"use server";

import SportPage from "@/components/mainPages/sportsPage";

import { getAllSportEvents } from "@/lib/actions";

const Sports = async () => {
    //get sportEvents from the database
    const events = await getAllSportEvents();
    return <SportPage sportEvents={events} />; // Pass the fetched
};

export default Sports;
