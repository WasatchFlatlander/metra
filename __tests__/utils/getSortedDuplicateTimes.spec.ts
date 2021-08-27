import { getSortedDuplicateTimes } from "../../src/utils/getSortedDuplicateTimes";

describe("getSortedDuplicateTimes", () => {
  test("Should return an empty array with no duplicates", () => {
    const array = [1, 2, 3, 4, 5];
    const arrayDuplicates = getSortedDuplicateTimes(array);
    expect(arrayDuplicates.length).toBe(0);
  });

  test("Should return an array of duplicates", () => {
    const array = [1, 2, 3, 4, 5, 5, 4, 3, 2, 1];
    const arrayDuplicates = getSortedDuplicateTimes(array);
    expect(arrayDuplicates).toEqual([1, 2, 3, 4, 5]);
  });

  test("Should return an array of duplicates sorted", () => {
    const array = [5, 4, 3, 2, 1, 1, 2, 3, 4, 5];
    const arrayDuplicates = getSortedDuplicateTimes(array);
    expect(arrayDuplicates).toEqual([1, 2, 3, 4, 5]);
  });

  test("Should handle more than duplicated data", () => {
    const array = [1, 1, 1, 2, 3, 4, 5];
    const arrayDuplicates = getSortedDuplicateTimes(array);
    expect(arrayDuplicates).toEqual([1]);
  });
});
