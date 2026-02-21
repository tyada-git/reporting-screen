import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import type { TimeEntry } from "../types/report.type";
import { formatTime } from "../utils/formatTime";
import { formatShortDate } from "../utils/formatShortDate";
import { calculateDuration } from "../utils/calculateDuration";

const ROWS_PER_PAGE = 10;

const TableEntries = ({ entries }: { entries: TimeEntry[] }) => {
  const [page, setPage] = useState(0);

  const paginatedEntries = entries.slice(
    page * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE + ROWS_PER_PAGE,
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Time</TableCell>
            <TableCell></TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Duration</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Activity</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>User</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Note</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedEntries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{formatTime(entry.duration.startedAt)}</TableCell>
              <TableCell>{formatTime(entry.duration.stoppedAt)}</TableCell>
              <TableCell>{formatShortDate(entry.duration.startedAt)}</TableCell>
              <TableCell>
                {(() => {
                  const duration = calculateDuration(
                    entry.duration.startedAt,
                    entry.duration.stoppedAt,
                  );

                  const [hours, minutes, seconds] = duration.split(":");

                  return (
                    <>
                      <span style={{ fontWeight: 800 }}>
                        {hours}:{minutes}
                      </span>
                      :{seconds}
                    </>
                  );
                })()}
              </TableCell>
              <TableCell>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      backgroundColor: entry.activity.color,
                      display: "inline-block",
                    }}
                  />
                  {entry.activity.name}
                </span>
              </TableCell>
              <TableCell>{entry.user.email}</TableCell>
              <TableCell>{entry.note?.text ?? ""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={entries.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={ROWS_PER_PAGE}
        rowsPerPageOptions={[]}
      />
    </TableContainer>
  );
};

export default TableEntries;
