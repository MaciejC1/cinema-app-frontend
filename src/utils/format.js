export const formatDuration = (minutes) => {
    if (!minutes) return "";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
};

export const formatDateToISO = (date) => {
  if (!date) return null;
  return date.toISOString().split("T")[0];
};