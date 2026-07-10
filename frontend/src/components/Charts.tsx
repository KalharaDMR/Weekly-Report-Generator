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

interface Props {
  charts: any;
}

const colors = [
  "#1976d2",
  "#43a047",
  "#ef6c00",
  "#d32f2f",
];

export default function Charts({
  charts,
}: Props) {
  if (!charts) return null;

  return (
    <div
      style={{
        display: "flex",
        gap: 50,
        marginTop: 40,
      }}
    >
      <PieChart width={350} height={300}>
        <Pie
          data={charts.submissionStatus}
          dataKey="count"
          nameKey="status"
          outerRadius={100}
        >
          {charts.submissionStatus.map(
            (_: any, index: number) => (
              <Cell
                key={index}
                fill={
                  colors[
                    index % colors.length
                  ]
                }
              />
            )
          )}
        </Pie>

        <Tooltip />
      </PieChart>

      <BarChart
        width={500}
        height={300}
        data={
          charts.projectDistribution
        }
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="project" />

        <YAxis />

        <Tooltip />

        <Bar dataKey="reports" />
      </BarChart>
    </div>
  );
}