import { UserInputError } from "apollo-server";

export { validateStopTime };

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
