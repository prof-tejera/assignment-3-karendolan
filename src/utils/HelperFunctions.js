/**
 * Helper to convert seconds into display HH:MM:SS
 */
export const getHmsDisplayFromSecs = (secs) => {
  const getHrsFromSecs = (secs) => Math.floor(secs / (60 * 60));
  const getMinRemainderFromSecs = (secs) =>  Math.floor(secs % (60 * 60) / 60);
  const getSecRemainerFromSecs = (secs) =>  Math.floor(secs % (60 * 60) % 60);
  const hr = `${('00' + getHrsFromSecs(secs)).slice(-2)}`;
  const min = `${('00' + getMinRemainderFromSecs(secs)).slice(-2)}`;
  const sec = `${('00' + getSecRemainerFromSecs(secs)).slice(-2)}`;
  // return HH:mm:ss only if time contains hours
  if (getHrsFromSecs(secs) > 0) {
    return `${hr}:${min}:${sec}`;
  }
  return `${min}:${sec}`;
}
