"use client";
const url = "https://infinitum-website.onrender.com";
console.log(url);

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Student {
  roll_no: string;
  attended:number;
  student: {
    name: string;
    email: string;
    phn_no: string;
  };
  event: string;
}

const eventMap: Record<string, string> = {
  "AI Story Quest": "1",
  "Pandemic": "2",
  "Family Feud": "3",
};

const AdminDashboard = () => {
  const router=useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("0");
  const [token, setToken] = useState<string>("");

  useEffect(()=>{    
    const isAuthenticated=localStorage.getItem("isAdminLoggedIn");
    // console.log(isAuthenticated);
    if (!isAuthenticated) {
      router.replace("/admin");
    }
  }, [router]);


  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      setToken(storedToken);
      console.log(storedToken);
    } else {
      console.error("Token not found in localStorage");
      router.replace("/admin"); 
    }
  }, [router]);


  useEffect(() => {
    if (token) {
      fetchAllStudents();
    }
  }, [token]);


   const fetchStudentsById = async (eventId: string) => {
    if (!token) return [];
    try {
      const response = await axios.get<Student[]>(`${url}/api/event/fetch/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      return response.data || [];
    } catch (error) {
      console.error(`Error fetching students for event ${eventId}:`, error);
      return [];
    }
  };

  const fetchAllStudents = async () => {
    try {
      const eventIds = Object.values(eventMap);
      let allStudents: Student[] = [];
      for (const id of eventIds) {
        const studentsForEvent = await fetchStudentsById(id);
        allStudents = [...allStudents, ...studentsForEvent.map(s => ({ ...s, event: id }))];
      }
      setStudents(allStudents);
    } catch (error) {
      console.error("Error fetching all students:", error);
    }
  };

  const handleAttendanceChange = async (rollNo: string, eventId: string, currentStatus: number) => {
    if (!token) return;   
    if (!rollNo || !eventId) {
        console.error("Missing required fields:", { rollNo, eventId });
        return;
    }

    const updatedStatus = currentStatus === 1 ? 0 : 1;
    if (currentStatus === 1) {
        const confirmed = window.confirm("want to mark absent?");
        if (!confirmed) return; 
    }

    try {
        console.log("Sending data:", { roll_no: rollNo, event_id: eventId, attendance: updatedStatus });

        const response = await axios.post(
            `${url}/api/attendance/putattendance`,
            { roll_no: rollNo, event_id: eventId, attendance: updatedStatus },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        
        setStudents((prev) =>
            prev.map((student) =>
                student.roll_no === rollNo && student.event === eventId
                    ? { ...student, attended: updatedStatus }
                    : student
            )
        );

        console.log("API Response:", response.data);
    } catch (error) {
        console.error("Error updating attendance:", error);
    }
};

   const handleFilterChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedEvent(selected);

    if (selected === "0") {
      fetchAllStudents();
    } else {
      const studentsForEvent = await fetchStudentsById(selected);
      setStudents(studentsForEvent.map(s => ({ ...s, event: selected })));
    }
  };

  return (
    <div className="min-h-screen p-6 bg-[#1A1A2E] text-white">
      <h1 className="text-2xl font-bold mt-14">Admin Dashboard</h1>

      <div className="flex justify-between items-center my-4 mt-10">
        <div>
          <label className="mr-5 font-semibold">Select Event:</label>
          <select
            className="border p-2 text-black bg-[#CCD6E0FC] rounded"
            onChange={handleFilterChange}
            value={selectedEvent}
            >
            <option key="default" value="0">Select an event</option>
            {Object.entries(eventMap).map(([name, id]) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </div>

        {/* <div>
          <label className="mr-5 font-semibold">Search:</label>
          <input
            type="text"
            placeholder="Enter Roll No or Name"
            className="border p-2 text-gray-800 bg-[#CCD6E0FC] rounded placeholder-gray-500"
          />
        </div> */}
      </div>

      <table className="w-full border-collapse border border-black mt-11">
        <thead>
          <tr className="bg-[#CCD6E0FC] text-black">
            <th className="border border-black p-2">Roll No</th>
            <th className="border border-black p-2">Name</th>
            <th className="border border-black p-2">Email</th>
            <th className="border border-black p-2">Contact Number</th>
            <th className="border border-black p-2">Event</th>
            <th className="border border-black p-2">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr
                key={`${student.roll_no}_${student.event}`}
                className="text-center"
              >
                <td className="border p-2">{student.roll_no}</td>
                <td className="border p-2">{student.student.name}</td>
                <td className="border p-2">{student.student.email}</td>
                <td className="border p-2">{student.student.phn_no}</td>
                <td className="border p-2">{student.event}</td>
                <td className="border p-2">
                  <input
                    type="checkbox"
                    className="w-5 h-5 border-2 border-white bg-white checked:bg-black checked:border-black rounded transition-all"
                    checked={student.attended===1}
                    onChange={() =>
                      handleAttendanceChange(student.roll_no,student.event,student.attended)
                    }
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="border p-2 text-center">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
