import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { TimeEntry } from "../types/report.type";
import { formatTime } from "../utils/formatTime";
import { formatShortDate } from "../utils/formatShortDate";
import { calculateDuration } from "../utils/calculateDuration";

const TableEntries = ({ entries }: { entries: TimeEntry[] }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell></TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Activity</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Note</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{formatTime(entry.duration.startedAt)}</TableCell>
              <TableCell>
                {formatTime(entry.duration.stoppedAt)}{" "}
                <span>{formatShortDate(entry.duration.startedAt)}</span>
              </TableCell>
              <TableCell>
                {calculateDuration(
                  entry.duration.startedAt,
                  entry.duration.stoppedAt,
                )}
              </TableCell>
              <TableCell>{entry.activity.name}</TableCell>
              <TableCell>{entry.user.name}</TableCell>
              <TableCell>{entry.note?.text}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableEntries;
