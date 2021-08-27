import {
  validateStopTime,
  validateScheduleTimes,
} from "../../src/utils/validations";

describe("validations", () => {
  describe("validateStopTime", () => {
    test("Should not throw an error for valid stopTime", () => {
      const stopTime = validateStopTime(0);
      expect(stopTime).toEqual(0);
    });

    test("Should throw an error for invalid stopTime below valid range", () => {
      let error;
      try {
        validateStopTime(-1);
      } catch (e) {
        error = e;
      }
      expect(error).toBeDefined();
      expect(error.message).toEqual(
        "Stop time must be greater than 0 and less than 1440 (total minutes in a day)"
      );
    });

    test("Should throw an error for invalid stopTime above valid range", () => {
      let error;
      try {
        validateStopTime(1440);
      } catch (e) {
        error = e;
      }
      expect(error).toBeDefined();
      expect(error.message).toEqual(
        "Stop time must be greater than 0 and less than 1440 (total minutes in a day)"
      );
    });
  });

  describe("validateScheduleTimes", () => {
    test("Should not throw an error for valid stopTimes", () => {
      const stopTimes = validateScheduleTimes([1, 2, 3]);
      expect(stopTimes).toEqual([1, 2, 3]);
    });

    test("Should throw an error for empty stopTimes", () => {
      let error;
      try {
        validateScheduleTimes([]);
      } catch (e) {
        error = e;
      }
      expect(error).toBeDefined();
      expect(error.message).toEqual(
        "At least one schedule time required. Empty schedule submitted"
      );
    });

    test("Should throw an error for duplicateTimes", () => {
      let error;
      try {
        validateScheduleTimes([1, 2, 2, 3]);
      } catch (e) {
        error = e;
      }
      expect(error).toBeDefined();
      expect(error.message).toEqual("Schedule times must be unique");
    });

    test("Should throw an error for invalid stop time", () => {
      let error;
      try {
        validateScheduleTimes([-1, 2, 3]);
      } catch (e) {
        error = e;
      }
      expect(error).toBeDefined();
      expect(error.message).toEqual(
        "Stop time must be greater than 0 and less than 1440 (total minutes in a day)"
      );
    });
  });
});
