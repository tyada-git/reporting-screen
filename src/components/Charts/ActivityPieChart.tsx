import { PieChart, pieArcClasses } from "@mui/x-charts/PieChart";
import type { TimeEntry } from "../../types/report.type";
import { calculateSeconds } from "../../utils/calculateDuration";
import { formatSecondstoHour } from "../../utils/formatTime";
import { Box, Typography } from "@mui/material";

interface ActivityData {
  label: string;
  value: number;
  color: string;
}

const settings = {
  margin: { top: 10, bottom: 10, left: 10, right: 10 },
  width: 300,
  height: 300,
  hideLegend: true, // we are building custom legend
};

const ActivityPieChart = ({ entries }: { entries: TimeEntry[] }) => {
  const grouped = entries.reduce<Record<string, ActivityData>>((acc, entry) => {
    const duration = calculateSeconds(
      entry.duration.startedAt,
      entry.duration.stoppedAt,
    );

    const key = entry.activity.name;

    if (!acc[key]) {
      acc[key] = {
        label: key,
        value: 0,
        color: entry.activity.color,
      };
    }

    acc[key].value += duration;
    return acc;
  }, {});

  const result = Object.values(grouped);
  const totalSeconds = result.reduce((sum, item) => sum + item.value, 0);

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
        Summary
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: { xs: "wrap", sm: "nowrap" },
        }}
      >
        <Box sx={{ width: 300, height: 300, display: "grid" }}>
          <PieChart
            series={[
              {
                id: "outer",
                innerRadius: 80,
                outerRadius: 110,
                data: result,
                highlightScope: { fade: "global", highlight: "item" },
                faded: { additionalRadius: -10 },
                valueFormatter: (item) => formatSecondstoHour(item.value),
              },
            ]}
            {...settings}
            sx={{
              gridArea: "1 / 1",
              [`.${pieArcClasses.root}`]: {
                opacity: 1,
                transition: "opacity 200ms ease",
              },
              [`.${pieArcClasses.faded}`]: {
                opacity: 0.2,
              },
              [`.${pieArcClasses.highlighted}`]: {
                opacity: 1,
              },
            }}
          />

          <Box
            sx={{
              gridArea: "1 / 1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              {formatSecondstoHour(totalSeconds)}
            </Typography>
          </Box>
        </Box>

        {/* // created this legend as thelegend of pie chart was causing issue while placing the center text */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            minWidth: 200,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          {result.map((r) => (
            <Box
              key={r.label}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    backgroundColor: r.color,
                    flexShrink: 0,
                  }}
                />
                <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
                  {r.label}
                </Typography>
              </Box>

              <Box
                component="span"
                sx={{
                  backgroundColor: r.color,
                  color: "#fff",
                  px: 1,
                  py: 0.25,
                  borderRadius: 1,
                  fontSize: 12,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                {formatSecondstoHour(r.value)}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ActivityPieChart;
