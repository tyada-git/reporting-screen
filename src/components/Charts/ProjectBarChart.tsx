import { BarChart } from "@mui/x-charts";
import type { TimeEntry } from "../../types/report.type";
import { calculateSeconds } from "../../utils/calculateDuration";
import { Typography } from "@mui/material";

const ProjectBarChart = ({ entries }: { entries: TimeEntry[] }) => {
  const folderMap: Record<string, number> = {};

  entries.forEach((entry) => {
    const folderName = entry.folder?.name || "No Project";
    const duration = calculateSeconds(
      entry.duration.startedAt,
      entry.duration.stoppedAt,
    );

    if (!folderMap[folderName]) {
      folderMap[folderName] = 0;
    }

    folderMap[folderName] += duration;
  });
  const barData = Object.entries(folderMap).map(([name, value]) => ({
    name,
    hours: value / 3600,
  }));
  const categoryGapRatio = barData.length <= 2 ? 0.8 : 0.3;
  return (
    <>
      <Typography variant="h6" fontWeight={700}>
        Time
      </Typography>
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: barData.map((d) => d.name),
            categoryGapRatio,
          },
        ]}
        series={[
          {
            data: barData.map((d) => d.hours),
            label: "Hours Spent",
          },
        ]}
        height={400}
      />
    </>
  );
};

export default ProjectBarChart;
