import "reflect-metadata";
import { validate } from "class-validator";
import { Schedule } from "../../src/schemas/Schedule";

describe("Schedule", () => {
  test("should not throw an error for valid Schedule", async () => {
    const schedule = Object.assign(new Schedule(), {
      name: "abcd",
      times: [1, 2, 3],
    });
    const errors = await validate(schedule);
    expect(errors.length).toEqual(0);
  });

  test("should throw an error for schedule with empty name", async () => {
    const schedule = Object.assign(new Schedule(), {
      name: "",
      times: [1, 2, 3],
    });
    const errors = await validate(schedule);
    expect(errors.length).toEqual(1);
    expect(errors[0].constraints.isLength).toEqual(
      "name must be longer than or equal to 1 characters"
    );
  });

  test("should throw an error for schedule with name > 4 characters", async () => {
    const schedule = Object.assign(new Schedule(), {
      name: "abcde",
      times: [1, 2, 3],
    });
    const errors = await validate(schedule);
    expect(errors.length).toEqual(1);
    expect(errors[0].constraints.isLength).toEqual(
      "name must be shorter than or equal to 4 characters"
    );
  });

  test("should throw an error for empty array of times", async () => {
    const schedule = Object.assign(new Schedule(), {
      name: "abcd",
      times: [],
    });
    const errors = await validate(schedule);
    expect(errors.length).toEqual(1);
    expect(errors[0].constraints.arrayNotEmpty).toEqual(
      "times should not be empty"
    );
  });

  test("should throw an error for array of non unique times", async () => {
    const schedule = Object.assign(new Schedule(), {
      name: "abcd",
      times: [1, 1, 1],
    });
    const errors = await validate(schedule);
    expect(errors.length).toEqual(1);
    expect(errors[0].constraints.arrayUnique).toEqual(
      "All times's elements must be unique"
    );
  });

  test("should throw an error for array with invalid times less than min", async () => {
    const schedule = Object.assign(new Schedule(), {
      name: "abcd",
      times: [-1],
    });
    const errors = await validate(schedule);
    expect(errors.length).toEqual(1);
    expect(errors[0].constraints.min).toEqual(
      "each value in times must not be less than 0"
    );
  });

  test("should throw an error for array with invalid times greater than max", async () => {
    const schedule = Object.assign(new Schedule(), {
      name: "abcd",
      times: [1440],
    });
    const errors = await validate(schedule);
    expect(errors.length).toEqual(1);
    expect(errors[0].constraints.max).toEqual(
      "each value in times must not be greater than 1439"
    );
  });
});
