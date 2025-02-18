import Head from "next/head";
import GanttChart from "@/components/GanttChart";
import "@/styles/globals.css"; // Import global styles

const GanttPage = () => {
  return (
    <>
      <Head>
        <title>Responsive Gantt Chart</title>
      </Head>

      <div className="background-container">
        {[...Array(20)].map((_, i) => (
          <div className="dot" key={i}></div>
        ))}
      </div>

      <div id="tables_wrapper">
        <div id="registered_table">
          <h2>Registered Events</h2>
          <table>
            <thead>
              <tr>
                <th>Date & Event</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024-09-14: Git and GitHub</td>
                <td>14:00</td>
                <td>17:00</td>
              </tr>
              <tr>
                <td>2024-09-21: EtherX: Capture the Flag</td>
                <td>17:00</td>
                <td>18:00</td>
              </tr>
              <tr>
                <td>2024-09-22: EtherX: Hackathon Essentials</td>
                <td>15:00</td>
                <td>18:00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id="unregistered_table">
          <h2>Unregistered Events</h2>
          <table>
            <thead>
              <tr>
                <th>Date & Event</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024-09-20: EtherX: DevSecOps</td>
                <td>16:00</td>
                <td>19:00</td>
              </tr>
              <tr>
                <td>2024-09-21: EtherX: OSINT</td>
                <td>13:00</td>
                <td>19:00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <GanttChart />
    </>
  );
};

export default GanttPage;
