import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

interface Props {
  title: string;
  value: number | string;
}

export default function DashboardCard({
  title,
  value,
}: Props) {
  return (
    <Card
      sx={{
        minWidth: 220,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography
          color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>

        <Typography
          variant="h4"
          fontWeight="bold"
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}