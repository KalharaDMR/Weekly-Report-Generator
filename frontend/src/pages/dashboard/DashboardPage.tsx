import { useQuery } from "@tanstack/react-query";

import {
  getSummary,
} from "../../services/dashboard.service";

import DashboardCard from "../../components/DashboardCard";

export default function DashboardPage() {
  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
  });

  return (
    <>
      <h1>Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 30,
          flexWrap: "wrap",
        }}
      >
        <DashboardCard
          title="Reports"
          value={data?.totalReports ?? 0}
        />

        <DashboardCard
          title="Submitted"
          value={data?.submittedReports ?? 0}
        />

        <DashboardCard
          title="Pending"
          value={data?.pendingReports ?? 0}
        />

        <DashboardCard
          title="Compliance"
          value={`${data?.complianceRate ?? 0}%`}
        />

        <DashboardCard
          title="Blockers"
          value={data?.openBlockers ?? 0}
        />
      </div>
    </>
  );
}