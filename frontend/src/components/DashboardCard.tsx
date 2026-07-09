interface Props {
  title: string;
  value: number | string;
}

export default function DashboardCard({
  title,
  value,
}: Props) {
  return (
    <div
      style={{
        background: "white",
        padding: 20,
        borderRadius: 10,
        width: 220,
      }}
    >
      <h4>{title}</h4>

      <h2>{value}</h2>
    </div>
  );
}