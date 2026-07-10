import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import "./Charts.css"; // <-- import the CSS

interface Props {
  charts: any;
}

const colors = ["#1976d2", "#43a047", "#ef6c00", "#d32f2f"];

export default function Charts({ charts }: Props) {
  if (!charts) return null;

  return (
    <div className="charts-wrapper">
      <div className="chart-card">
        <div className="chart-title">📊 Submission Status</div>
        <div className="chart-container">
          <PieChart width={350} height={300}>
            <Pie
              data={charts.submissionStatus}
              dataKey="count"
              nameKey="status"
              outerRadius={100}
            >
              {charts.submissionStatus.map((_: any, index: number) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-title">📈 Project Distribution</div>
        <div className="chart-container">
          <BarChart
            width={500}
            height={300}
            data={charts.projectDistribution}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="project" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="reports" fill="#2563eb" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}