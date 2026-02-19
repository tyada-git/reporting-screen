import { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSignInMutation } from "../services/authApi";
import { useGetReportQuery } from "../services/reportApi";
import TableEntries from "./TableEntries";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import ActivityFilter from "./Filters/ActivityFilter";

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
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Reporting Screen
      </Typography>

      {authLoading && <Typography>Signing in...</Typography>}
      {authError && <Typography>Auth error</Typography>}

      {reportLoading && <Typography>Loading report...</Typography>}
      {reportError && <Typography>Report error</Typography>}
      <DatePicker
        label="Start Date"
        value={startDate}
        onChange={(val) => setStartDate(val)}
      />
      <DatePicker
        label="End Date"
        value={endDate}
        onChange={(val) => setEndDate(val)}
      />
      <ActivityFilter
        allActivities={allActivities}
        selectedActivities={selectedActivities}
        onChange={setSelectedActivities}
      />
      {data && <TableEntries entries={filteredEntries} />}
    </Box>
  );
};
export default ReportPage;
