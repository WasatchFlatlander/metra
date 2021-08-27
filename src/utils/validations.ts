import { UserInputError } from "apollo-server";
import { getSortedDuplicateTimes } from "./getSortedDuplicateTimes";

export { validateStopTime, validateScheduleTimes };

function validateStopTime(stopTime: number): number {
  if (stopTime < 0 || stopTime > 1439) {
    throw new UserInputError(
      "Stop time must be greater than 0 and less than 1440 (total minutes in a day)",
      {
        stopTime,
      }
    );
  }
  return stopTime;
}

function checkForDuplicates(stopTimes: number[]): void {
  const uniqueStopTimes = new Set(stopTimes);
  if (stopTimes.length !== uniqueStopTimes.size) {
    const duplicateStopTimes = getSortedDuplicateTimes(stopTimes);
    throw new UserInputError("Schedule times must be unique", {
      duplicateStopTimes,
    });
  }
}

function checkForEmptyStopTimes(stopTimes: number[]): void {
  if (!stopTimes.length) {
    throw new UserInputError(
      "At least one schedule time required. Empty schedule submitted",
      { stopTimes }
    );
  }
}

function checkForInvalidStopTimes(stopTimes: number[]) {
  stopTimes.forEach((stopTime) => {
    validateStopTime(stopTime);
  });
}

function validateScheduleTimes(stopTimes: number[]): number[] {
  checkForEmptyStopTimes(stopTimes);
  checkForDuplicates(stopTimes);
  checkForInvalidStopTimes(stopTimes);
  return stopTimes;
}
