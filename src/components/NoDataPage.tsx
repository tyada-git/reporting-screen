import { Box, Paper, Typography } from "@mui/material";

const NoDataPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          p: 4,
          textAlign: "center",
          width: "100%",
          minHeight: "400px",
        }}
      >
        <img
          src="/noDataIllustration.svg"
          alt="No data"
          style={{
            width: "200px",
            marginBottom: "16px",
          }}
        />

        <Typography variant="h6" fontWeight={600}>
          No data for selected filters
        </Typography>
      </Paper>
    </Box>
  );
};

export default NoDataPage;
