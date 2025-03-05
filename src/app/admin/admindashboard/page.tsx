"use client";
const url = "https://infinitumdb.psgtech.ac.in";
console.log(url);

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Student {
  roll_no: string;
  student: {
    name: string;
    email: string;
    phn_no: string;
  };
  event: string;
}
interface GeneralRegistration {
  sno: number;
  roll_no: string;
  name: string;
  email: string;
  phn_no: string;
  referral: string | null;
}
interface AttendanceResponse {
  [key: string]: boolean;
}

const AdminDashboard = () => {
  const router = useRouter();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminLoggedIn");
    // console.log(isAuthenticated);
    if (!isAuthenticated) {
      router.replace("/admin");
    }
  }, [router]);

  const [students, setStudents] = useState<Student[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [generalRegistrations, setGeneralRegistrations] = useState<GeneralRegistration[]>([]);
  const [attendance, setAttendance] = useState<AttendanceResponse>({});
  const [token, setToken] = useState<string>("");
  // const [error, setError] = useState<string>("");

  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      console.error("Token not found in localStorage!");
      router.replace("/admin");
    }
  }, [router]);
  useEffect(() => {
    if (students.length > 0) {
      const initialAttendance: AttendanceResponse = {};
      students.forEach((student) => {
        initialAttendance[student.roll_no] = false;
      });
      setAttendance(initialAttendance);
    }
  }, [students]);
  // useEffect(() => {

  //   const fetchAllAttendance = async () => {
  //     const attendanceData: AttendanceResponse = {};
  //     for (const student of students) {
  //       const status = await fetchStudentAttendance(student.id, student.event);
  //       attendanceData[student.id] = status;
  //     }
  //     setAttendance(attendanceData);
  //   };

  //   if (students.length > 0) {
  //     fetchAllAttendance();
  //   }
  // }, [students]);

  const fetchStudents = async (eventId: string) => {
    if (!token) {
      console.error("Token is missing. Cannot fetch students.");
      return;
    }
    try {
      let response;
      if (eventId === "general") {
        response = await axios.get<GeneralRegistration[]>(`${url}/api/event/general`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data) {
          const formatted = response.data.map((s) => ({
            sno: s.sno,
            roll_no: s.roll_no || "N/A",
            name: s.name || "N/A",
            email: s.email || "N/A",
            phn_no: s.phn_no || "N/A",
            referral: s.referral || "N/A",
          }));
          setGeneralRegistrations(formatted);
        }
      } else {
        response = await axios.get<Student[]>(`${url}/api/event/fetch/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data) {
          const formattedStudents = response.data.map((s) => ({
            roll_no: s.roll_no,
            student: {
              name: s.student?.name || "N/A",
              email: s.student?.email || "N/A",
              phn_no: s.student?.phn_no || "N/A",
            },
            event: eventId,
          }));
          setStudents(formattedStudents);
        }
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // const fetchStudentEvents = async (query: string) => {
  //   if (!token) return;

  //   if (!query) {
  //     setStudents([]);
  //     return;
  //   }

  //   try {
  //         const response = await axios.get<Student[]>(
  //       `${url}/api/student/registeredEvents/${query}`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     if (response.data.length === 0) {
  //       // setError("No students found matching your query.");
  //       setStudents([]);
  //     } else {
  //       setStudents(response.data);
  //       // setError("");
  //     }

  //   } catch (error:any) {
  //     console.error("Full error:", error);
  //     console.error("Error response:", error.response?.data);
  //     console.error("Error status:", error.response?.status);
  //   }
  // };

  // const fetchStudentAttendance = async (rollNo: string, eventId: string) => {
  //   if (!token) return false;

  //   try {

  //     const response = await axios.get(
  //       `${url}/api/attendance/putattendance`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //         params: { roll_no: rollNo, event_id: eventId },
  //       }
  //     );
  //     const attendanceData = response.data as AttendanceResponse;
  //     return attendanceData[rollNo] ?? false;
  //   } catch (error) {
  //     console.error('Error fetching attendance:', error);
  //     return false;
  //   }
  // };
  const handleAttendanceChange = async (rollNo: string, eventId: string) => {
    console.log("Sending data:", { roll_no: rollNo, event_id: eventId });
    if (!token) return;
    if (!rollNo || !eventId) {
      console.error("Missing required fields:", { rollNo, eventId });
      return;
    }

    try {
      const updatedStatus = !attendance[rollNo];

      setAttendance((prev) => ({
        ...prev,
        [rollNo]: updatedStatus,
      }));
      console.log("Sending data:", { roll_no: rollNo, event_id: eventId });
      const response = await axios.post(
        `${url}/api/attendance/putattendance`,
        { roll_no: rollNo, event_id: eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedEvent(selected);
    if (selected) {
      fetchStudents(selected);
    } else {
      setStudents([]);
    }
  };
  // const formattedStudents = students.map((s) => ({
  //   roll_no: s.roll_no,
  //   name: s.student?.name || "N/A",
  //   email: s.student?.email || "N/A",
  //   phn_no: s.student?.phn_no || "N/A",
  //   event: eventMap[s.event]||s.event,
  // }));

  // console.log("Formatted Students:", formattedStudents);
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
            <option key="default" value="">
              Select an event
            </option>
            <option key="2" value="2">
              AI Story Quest
            </option>
            <option key="1" value="1">
              Workshop: Ikigai in AI
            </option>
            <option key="5" value="5">
              Nexus - Hackathon
            </option>
            <option key="4" value="4">
              The Pandemic 
            </option>
            <option key="3" value="3">
              Quiz roulette
            </option>
          </select>
        </div>

        <div>
          <label className="mr-5 font-semibold">Search:</label>
          <input
            type="text"
            placeholder="Enter Roll No or Name"
            className="border p-2 text-gray-800 bg-[#CCD6E0FC] rounded placeholder-gray-500"
            // onChange={(e) => fetchStudentEvents(e.target.value)}
          />
        </div>
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
          {selectedEvent === "general" ? (
            generalRegistrations.length > 0 ? (
              generalRegistrations.map((registration) => (
                <tr key={registration.roll_no} className="text-center">
                  <td className="border p-2">{registration.roll_no}</td>
                  <td className="border p-2">{registration.name}</td>
                  <td className="border p-2">{registration.email}</td>
                  <td className="border p-2">{registration.phn_no}</td>
                  <td className="border p-2">General Registration</td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="border p-2 text-center">
                  No registrations found
                </td>
              </tr>
            )
          ) : students.length > 0 ? (
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
                    checked={attendance[student.roll_no] || false}
                    onChange={() =>
                      handleAttendanceChange(student.roll_no, student.event)
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
