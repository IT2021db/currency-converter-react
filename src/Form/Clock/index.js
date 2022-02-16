import React, { useEffect, useState } from "react";
import "./style.css";

// const dateFormat = (date) => date.toLocaString(undefined, {
//     month: "long",
//     weekday: "long",
//     day: "numeric",
//     year: "numeric",
//     hour: "2-digit",
//     second: "2-digit"
// });

const Clock = () => {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className="clock">
            Dzisiaj jest
            {" "}
            {date.toLocaleString(undefined, {
                month: "long",
                weekday: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            })}
        </div>
    )
};

export default Clock;