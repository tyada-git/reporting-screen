export const formatShortDate = (isoString: string) => {
  const date = new Date(isoString);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};
