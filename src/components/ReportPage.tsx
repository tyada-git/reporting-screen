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

const API_KEY = "MzkwMTM1X2M5Y2IxNjBmMWJlZDRhN2FhYTQ3ZWZkMzdkMjg5Nzk0";
const API_SECRET = "MzIxYzVlOWM1YTU3NDExY2I0ZThiOWMxYzk2ZmEzMmE";

const ReportPage = () => {
  const [tokenReady, setTokenReady] = useState(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs("2026-01-01"));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
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

  const filteredEntries = useMemo(() => {
    const entries = data?.timeEntries ?? [];

    if (selectedActivities.length === 0) {
      return entries;
    }

    return entries.filter((entry) =>
      selectedActivities.includes(entry.activity.name),
    );
  }, [data?.timeEntries, selectedActivities]);

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
            <Stack direction="row" spacing={2} flexWrap="wrap">
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

                      // optional: keep border consistent
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

                      // optional: keep border consistent
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#0B5C2D",
                      },
                    },
                  },
                }}
              />
              <ActivityFilter
                allActivities={allActivities}
                selectedActivities={selectedActivities}
                onChange={setSelectedActivities}
              />
            </Stack>
          </Stack>
        </Paper>

        {reportLoading ? (
          <Typography>Loading report...</Typography>
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
              <Stack>
                <ActivityPieChart entries={filteredEntries} />
              </Stack>
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
