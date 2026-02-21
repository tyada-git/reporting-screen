import { useEffect, useMemo, useState } from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import { useSignInMutation } from "../services/authApi";
import { useGetReportQuery } from "../services/reportApi";
import TableEntries from "./TableEntries";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import ActivityFilter from "./Filters/ActivityFilter";
import ActivityPieChart from "./Charts/ActivityPieChart";
import UserFilter from "./Filters/UserFilter";
import NoDataPage from "./NoDataPage";
import ProjectBarChart from "./Charts/ProjectBarChart";

const API_KEY = import.meta.env.VITE_SIGN_IN_API_KEY;
const API_SECRET = import.meta.env.VITE_SIGN_IN_API_SECRET;

const ReportPage = () => {
  const [tokenReady, setTokenReady] = useState(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs("2026-01-01"));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [selectedUsers, setSelectedUsers] = useState<string[] | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<string[] | null>(
    null,
  );

  const [signIn, { isLoading: authLoading, error: authError }] =
    useSignInMutation();

  useEffect(() => {
    const existing = localStorage.getItem("accessToken");
    if (existing) {
      setTokenReady(true);
      return;
    }

    signIn({ apiKey: API_KEY, apiSecret: API_SECRET })
      .unwrap()
      .then((res) => {
        localStorage.setItem("accessToken", res.token);
        setTokenReady(true);
      })
      .catch((e) => {
        console.error("Sign-in failed", e);
      });
  }, [signIn]);

  const {
    data,
    isLoading: reportLoading,
    error: reportError,
  } = useGetReportQuery(
    {
      startDate: startDate?.format("YYYY-MM-DD") || "",
      endDate: endDate?.format("YYYY-MM-DD") || "",
    },
    { skip: !tokenReady },
  );

  const allActivities =
    data?.timeEntries.reduce<string[]>((acc, d) => {
      if (!acc.includes(d.activity.name)) acc.push(d.activity.name);
      return acc;
    }, []) ?? [];

  const allUsers =
    data?.timeEntries.reduce<string[]>((acc, d) => {
      if (!acc.includes(d.user.email)) acc.push(d.user.email);
      return acc;
    }, []) ?? [];
  const activeUsers = selectedUsers ?? allUsers;
  const activeActivities = selectedActivities ?? allActivities;

  const filteredEntries = useMemo(() => {
    const entries = data?.timeEntries ?? [];

    if (activeUsers.length === 0) return [];
    if (activeActivities.length === 0) return [];

    return entries.filter(
      (e) =>
        activeUsers.includes(e.user.email) &&
        activeActivities.includes(e.activity.name),
    );
  }, [data?.timeEntries, activeUsers, activeActivities]);

  // Since our API is oly  giving 1 foldername - my activity I tried ti check with mock how bar chart looks
  // const timeEntries = [
  //   {
  //     id: "1",
  //     activity: {
  //       id: "dev",
  //       name: "Development 💻",
  //       color: "#8855ff",
  //       folderId: "1",
  //     },
  //     user: {
  //       id: "390135",
  //       name: "",
  //       email: "mz+fetesttask@timeular.com",
  //     },
  //     folder: {
  //       id: "1",
  //       name: "Client Project A",
  //     },
  //     duration: {
  //       startedAt: "2026-01-01T06:00:00.000",
  //       stoppedAt: "2026-01-01T09:00:00.000",
  //     },
  //     note: { tags: [], mentions: [] },
  //     timezone: "Z",
  //   },
  //   {
  //     id: "3",
  //     activity: {
  //       id: "design",
  //       name: "Design 🎨",
  //       color: "#aa44bb",
  //       folderId: "3",
  //     },
  //     user: {
  //       id: "390135",
  //       name: "",
  //       email: "mz+fetesttask@timeular.com",
  //     },
  //     folder: {
  //       id: "3",
  //       name: "Website Redesign",
  //     },
  //     duration: {
  //       startedAt: "2026-01-01T10:30:00.000",
  //       stoppedAt: "2026-01-01T12:00:00.000",
  //     },
  //     note: { tags: [], mentions: [] },
  //     timezone: "Z",
  //   },
  //   {
  //     id: "4",
  //     activity: {
  //       id: "dev",
  //       name: "Development 💻",
  //       color: "#8855ff",
  //       folderId: "4",
  //     },
  //     user: {
  //       id: "390135",
  //       name: "",
  //       email: "mz+fetesttask@timeular.com",
  //     },
  //     folder: {
  //       id: "4",
  //       name: "Mobile App",
  //     },
  //     duration: {
  //       startedAt: "2026-01-02T06:30:00.000",
  //       stoppedAt: "2026-01-02T09:30:00.000",
  //     },
  //     note: { tags: [], mentions: [] },
  //     timezone: "Z",
  //   },
  //   {
  //     id: "6",
  //     activity: {
  //       id: "research",
  //       name: "Research 🔍",
  //       color: "#33aa88",
  //       folderId: "5",
  //     },
  //     user: {
  //       id: "390135",
  //       name: "",
  //       email: "mz+fetesttask@timeular.com",
  //     },
  //     folder: {
  //       id: "5",
  //       name: "Innovation Lab",
  //     },
  //     duration: {
  //       startedAt: "2026-01-03T07:00:00.000",
  //       stoppedAt: "2026-01-03T10:00:00.000",
  //     },
  //     note: { tags: [], mentions: [] },
  //     timezone: "Z",
  //   },
  // ];

  return (
    <Box
      sx={{
        backgroundColor: "#f8f9fb",
        minHeight: "100vh",
        p: { xs: 1.5, sm: 2, md: 3 },
      }}
    >
      <Box sx={{ maxWidth: 1300, mx: "auto" }}>
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            mb: 2,
          }}
          elevation={0}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", sm: "center" }}
            justifyContent="space-between"
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              rowGap={2}
              flexWrap="wrap"
              sx={{
                width: "100%",
                "& > *": { flex: "1 1 220px" },
              }}
            >
              {authLoading && <Typography>Signing in...</Typography>}
              {authError && <Typography>Auth error</Typography>}

              {reportError && <Typography>Report error</Typography>}

              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(val) => setStartDate(val)}
                slotProps={{
                  textField: {
                    size: "medium",
                    sx: {
                      "&.Mui-focused": {
                        boxShadow: "0 0 0 4px rgb(180, 255, 127)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#0B5C2D",
                      },
                    },
                  },
                }}
              />

              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(val) => setEndDate(val)}
                slotProps={{
                  textField: {
                    size: "medium",
                    sx: {
                      "&.Mui-focused": {
                        boxShadow: "0 0 0 4px rgb(180, 255, 127)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#0B5C2D",
                      },
                    },
                  },
                }}
              />

              <ActivityFilter
                allActivities={allActivities}
                selectedActivities={activeActivities}
                onChange={setSelectedActivities}
              />
              <UserFilter
                selectedUsers={activeUsers}
                onChange={(newValue) => setSelectedUsers(newValue)}
                allUsers={allUsers}
              />
            </Stack>
          </Stack>
        </Paper>

        {reportLoading ? (
          <Typography>Loading report...</Typography>
        ) : filteredEntries.length === 0 ? (
          <NoDataPage />
        ) : (
          <Box>
            <Paper
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                p: 2,
                mb: 2,
              }}
            >
              <Box>
                <ActivityPieChart entries={filteredEntries} />
              </Box>
            </Paper>
            <Paper
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                p: 2,
                mb: 2,
              }}
            >
              <Box>
                <ProjectBarChart entries={filteredEntries} />
              </Box>
            </Paper>
            <Paper
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                p: 2,
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mb: 2 }}
              >
                <Typography variant="h6" fontWeight={600}>
                  Time Entries
                </Typography>
              </Stack>

              {data && <TableEntries entries={filteredEntries} />}
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default ReportPage;
