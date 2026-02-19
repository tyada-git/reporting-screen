import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSignInMutation } from "../services/authApi";
import { useGetReportQuery } from "../services/reportApi";
import TableEntries from "./TableEntries";

const API_KEY = "MzkwMTM1X2M5Y2IxNjBmMWJlZDRhN2FhYTQ3ZWZkMzdkMjg5Nzk0";
const API_SECRET = "MzIxYzVlOWM1YTU3NDExY2I0ZThiOWMxYzk2ZmEzMmE";

const ReportPage = () => {
  const [tokenReady, setTokenReady] = useState(false);
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
    { startDate: "2025-09-01", endDate: "2025-09-14" },
    { skip: !tokenReady },
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Reporting Screen
      </Typography>

      {authLoading && <Typography>Signing in...</Typography>}
      {authError && <Typography>Auth error</Typography>}

      {reportLoading && <Typography>Loading report...</Typography>}
      {reportError && <Typography>Report error</Typography>}

      {data && <TableEntries entries={data.timeEntries} />}
    </Box>
  );
};
export default ReportPage;
