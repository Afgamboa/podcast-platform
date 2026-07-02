export const formatTime = (milliseconds: number): string => {
  if (milliseconds < 0 || !milliseconds) return "N/A";

  const totalTimeInSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalTimeInSeconds / 3600);
  const minutes = Math.floor((totalTimeInSeconds % 3600) / 60);
  const seconds = totalTimeInSeconds % 60;

  const padFill = (num: number): string => num.toString().padStart(2, "0");

  if (hours > 0) {
    return `${padFill(hours)}:${padFill(minutes)}:${padFill(seconds)}`;
  }
  return `${padFill(minutes)}:${padFill(seconds)}`;
};
