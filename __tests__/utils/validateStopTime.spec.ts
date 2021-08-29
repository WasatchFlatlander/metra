import { validateStopTime } from "../../src/utils/validateStopTime";

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
