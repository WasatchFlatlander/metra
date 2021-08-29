import * as db from "../../src/utils/db";
import { validateScheduleName } from "../../src/utils/validateScheduleName";

describe("validateScheduleName", () => {
  db.set("bnsf", [1, 2, 3]);

  test("should not throw an error for schedule name in store", () => {
    let error;
    try {
      validateScheduleName("bnsf");
    } catch (e) {
      error = e;
    }
    expect(error).toBeUndefined();
  });

  test("should throw an error for schedule name NOT in store", () => {
    let error;
    try {
      validateScheduleName("upnw");
    } catch (e) {
      error = e;
    }
    expect(error).toBeDefined();
    expect(error.message).toEqual('Name not in db store keys');
  });
});
