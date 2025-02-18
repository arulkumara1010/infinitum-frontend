"use client"; // Ensures it's a client-side component

import { useEffect } from "react";
import dynamic from "next/dynamic";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";

const GanttChart = () => {
    useEffect(() => {
        // Dynamic import to prevent SSR issues
        import("dhtmlx-gantt").then((gantt) => {
            gantt.gantt.init("gantt_here");

            gantt.gantt.parse({
                data: [
                    { id: 1, text: "Git and GitHub", start_date: "2024-09-14 14:00", duration: 3 },
                    { id: 2, text: "DevSecOps", start_date: "2024-09-20 16:00", duration: 3 },
                    { id: 3, text: "Capture the Flag", start_date: "2024-09-21 17:00", duration: 1 },
                    { id: 4, text: "OSINT", start_date: "2024-09-21 13:00", duration: 6 },
                    { id: 5, text: "Hackathon Essentials", start_date: "2024-09-22 15:00", duration: 3 },
                ],
            });
        });
    }, []);

    return <div id="gantt_here" style={{ width: "100%", height: "230px" }}></div>;
};

export default dynamic(() => Promise.resolve(GanttChart), { ssr: false });
