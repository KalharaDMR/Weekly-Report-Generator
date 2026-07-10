import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export default function RecentActivity({
  data,
}: any) {
  return (
    <Table sx={{ mt: 5 }}>
      <TableHead>
        <TableRow>
          <TableCell>User</TableCell>

          <TableCell>
            Project
          </TableCell>

          <TableCell>
            Status
          </TableCell>

          <TableCell>
            Updated
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {data?.map((item: any) => (
          <TableRow key={item.id}>
            <TableCell>
              {item.user.name}
            </TableCell>

            <TableCell>
              {item.project.name}
            </TableCell>

            <TableCell>
              {item.status}
            </TableCell>

            <TableCell>
              {new Date(
                item.updatedAt
              ).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}