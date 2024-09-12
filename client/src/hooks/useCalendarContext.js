import { useContext } from "react";
import { CalendarContext } from "../context/calendarContext";


export const useCalendar = () => {

    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error("useCalendar debe ser usado con CalendarProvider");
    }
    return context;
}