// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import type { TimeEntry } from "../types/report.type";
// import { formatTime } from "../utils/formatTime";
// import { formatShortDate } from "../utils/formatShortDate";
// import { calculateDuration } from "../utils/calculateDuration";

// const TableEntries = ({ entries }: { entries: TimeEntry[] }) => {
//   return (
//     <TableContainer>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Time</TableCell>
//             <TableCell></TableCell>
//             <TableCell>Date</TableCell>
//             <TableCell>Duration</TableCell>
//             <TableCell>Activity</TableCell>
//             <TableCell>User</TableCell>
//             <TableCell>Note</TableCell>
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {entries.map((entry) => (
//             <TableRow key={entry.id}>
//               <TableCell>{formatTime(entry.duration.startedAt)}</TableCell>
//               <TableCell>{formatTime(entry.duration.stoppedAt)}</TableCell>
//               <TableCell>{formatShortDate(entry.duration.startedAt)}</TableCell>
//               <TableCell>
//                 {calculateDuration(
//                   entry.duration.startedAt,
//                   entry.duration.stoppedAt,
//                 )}
//               </TableCell>
//               <TableCell>{entry.activity.name}</TableCell>
//               <TableCell>{entry.user.email}</TableCell>
//               <TableCell>{entry.note?.text}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default TableEntries;
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
            <TableCell>Time</TableCell>
            <TableCell></TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Activity</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Note</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedEntries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{formatTime(entry.duration.startedAt)}</TableCell>
              <TableCell>{formatTime(entry.duration.stoppedAt)}</TableCell>
              <TableCell>{formatShortDate(entry.duration.startedAt)}</TableCell>
              <TableCell>
                {calculateDuration(
                  entry.duration.startedAt,
                  entry.duration.stoppedAt,
                )}
              </TableCell>
              <TableCell>{entry.activity.name}</TableCell>
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
