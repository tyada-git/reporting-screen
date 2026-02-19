export const calculateDuration = (
  startedAt: string,
  stoppedAt: string,
): string => {
  const start = new Date(startedAt).getTime();
  const end = new Date(stoppedAt).getTime();

  const diffMs = end - start;

  if (diffMs <= 0) return "0:00:00";

  const totalSeconds = Math.floor(diffMs / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}:${String(minutes).padStart(2, "0")}:${String(
    seconds,
  ).padStart(2, "0")}`;
};
