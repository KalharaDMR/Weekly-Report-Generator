import { Card, CardContent, Typography } from "@mui/material";

import "./DashboardCard.css"; // <-- import the CSS

interface Props {
  title: string;
  value: number | string;
}

export default function DashboardCard({ title, value }: Props) {
  return (
    <Card className="dashboard-card">
      <CardContent className="dashboard-card-content">
        <Typography className="dashboard-card-title" gutterBottom>
          {title}
        </Typography>
        <Typography className="dashboard-card-value">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}