"use client";
const url="https://infinitum-website.onrender.com"
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

// interface AttendanceResponse {
//   [key: string]: boolean;
// }

const AdminDashboard = () => {
  const router=useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("0");
  const [token, setToken] = useState<string>("");

  useEffect(()=>{    
    const isAuthenticated=localStorage.getItem("isAdminLoggedIn");
    // console.log(isAuthenticated);
    if (!isAuthenticated) {
      router.replace("/admin");}
  },[router]);


  // const [attendance, setAttendance] = useState<AttendanceResponse>({});  
  // const [allStudents, setAllStudents] = useState<Student[]>([]);
 

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


  // useEffect(() => {
  //   if (students.length > 0) {
  //     const initialAttendance: AttendanceResponse = {};
  //     students.forEach((student) => {
  //       initialAttendance[student.roll_no] = false; 
  //     });
  //     setAttendance(initialAttendance);
  //   }
  // }, [students]);

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
  const fetchStudentsById = async (eventId: string) => {
    if (!token) return [];
    try {
      const response = await axios.get<Student[]>(`${url}/api/event/fetch/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  
  // const fetchStudents = async (eventId: string) => {
    
  //   if (!token) {
  //     console.error("Token is missing. Cannot fetch students.");
  //     return;
  //   }
  //   try {
  //     let allStudents: Student[] = [];
  //     console.log("Current token:", token);
  //     if(eventId!=='0')
  //     {
  //       const response = await axios.get<Student[]>(
  //         `${url}/api/event/fetch/${eventId}`,
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );
  //       if (response.data) {
  //         const formattedStudents = response.data.map((s: any) => ({
  //           roll_no: s.roll_no,
  //           student: {
  //             name: s.student?.name || "N/A",
  //             email: s.student?.email || "N/A",
  //             phn_no: s.student?.phn_no || "N/A",
  //           },
  //           event: eventId,
  //         }));
  //         console.log("Formatted Students:", formattedStudents);
  //       setStudents(formattedStudents);
  //       }
  //     }else{
  //       const eventIds = Object.values(eventMap); // Get all event IDs
  //     const requests = eventIds.map((id) =>
  //       axios.get<Student[]>(`${url}/api/event/fetch/${id}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       })
  //     );

  //     const results = await Promise.all(requests);

  //     results.forEach((response, index) => {
  //       if (response.data) {
  //         const formattedStudents = response.data.map((s: any) => ({
  //           roll_no: s.roll_no,
  //           student: {
  //             name: s.student?.name || "N/A",
  //             email: s.student?.email || "N/A",
  //             phn_no: s.student?.phn_no || "N/A",
  //           },
  //           event: eventIds[index], // Assign correct event ID
  //         }));
  //         allStudents = [...allStudents, ...formattedStudents];
  //       }
  //     });
  //     }
  //      setStudents(allStudents);
  //   } catch (error) {
  //     console.error("Error fetching students:", error);
  //   }
  // };

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
  const handleAttendanceChange = async (rollNo: string, eventId: string,currentStatus: number) => {
    //console.log("Sending data:", { roll_no: rollNo, event_id: eventId });
    if (!token) return;   
    if (!rollNo || !eventId) {
      console.error("Missing required fields:", { rollNo, eventId });
      return;
    }

    try {
      const updatedStatus = currentStatus===1?0:1;
      console.log("Sending data:", { roll_no: rollNo, event_id: eventId });
      const response = await axios.post(
        `${url}/api/attendance/putattendance`,
        { roll_no: rollNo, event_id: eventId ,attended:updatedStatus},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStudents((prev)=>prev.map((student)=>
      student.roll_no===rollNo && student.event===eventId ? {...student,attended:updatedStatus}:student));
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

        <div>
          <label className="mr-5 font-semibold">Search:</label>
          <input
            type="text"
            placeholder="Enter Roll No or Name"
            className="border p-2 text-gray-800 bg-[#CCD6E0FC] rounded placeholder-gray-500"
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
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={`${student.roll_no}_${student.event}`} className="text-center">
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
