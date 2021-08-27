export function getSortedDuplicateTimes(allStopTimes: number[]): number[] {
  const duplicateStopTimes: number[] = [];
  allStopTimes.reduce((acc, stopTime) => {
    const timeCount = acc[stopTime];
    if (timeCount) {
      if (timeCount === 1) {
        duplicateStopTimes.push(stopTime);
      }
      acc[stopTime] = acc[stopTime] + 1;
    } else {
      acc[stopTime] = 1;
    }
    return acc;
  }, {});
  duplicateStopTimes.sort();
  return duplicateStopTimes;
}
