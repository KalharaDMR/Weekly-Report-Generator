import { useQuery } from "@tanstack/react-query";

import { getMyReports } from "../../services/report.service";

export default function ReportsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: () => getMyReports(),
  });

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <h1>My Weekly Reports</h1>
      <button>Create Report</button>

      <table
        border={1}
        cellPadding={10}
        style={{
          marginTop: 20,
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Project</th>
            <th>Week</th>
            <th>Status</th>
            <th>Hours</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((report: any) => (
            <tr key={report.id}>
              <td>{report.project.name}</td>

              <td>
                {new Date(
                  report.weekStart
                ).toLocaleDateString()}
              </td>

              <td>
                {report.submissionStatus}
              </td>

              <td>
                {report.hoursWorked}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}