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
  margin: { left: 2 },
  width: 300,
  height: 300,
  hideLegend: true,
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
  console.log(result);
  console.log(grouped);
  const totalSeconds = result.reduce((sum, item) => sum + item.value, 0);
  return (
    <Box>
      <Typography variant="h6" fontWeight={700}>
        Summary
      </Typography>
      <Box width={300} height={300} display="grid">
        <PieChart
          series={[
            {
              id: "outer",
              innerRadius: 80,
              outerRadius: 110,
              data: result,

              highlightScope: { fade: "global", highlight: "item" },
              valueFormatter: (item) => formatSecondstoHour(item.value),
            },
          ]}
          {...settings}
          sx={{
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
            gridArea: "1 / 1",
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

      {/* <Box position="relative" width={300} height={300}>
        <PieChart
          series={[
            {
              innerRadius: 80,
              outerRadius: 110,
              data: result,
              // arcLabel: (item) => formatSecondstoHour(item.value),
              valueFormatter: (item) => formatSecondstoHour(item.value),
            },
          ]}
          {...settings}
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            {formatSecondstoHour(totalSeconds)}
          </Typography>
        </Box>
      </Box> */}
    </Box>
  );
};

export default ActivityPieChart;
