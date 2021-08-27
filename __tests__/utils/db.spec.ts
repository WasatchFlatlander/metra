import * as db from "../../src/utils/db";

describe("db util", () => {
  test("Should set key/value", () => {
    const value = [1, 2, 3, 4, 5];
    const key = "bnsf";
    db.set(key, value);
    expect(db.fetch(key)).toEqual([1, 2, 3, 4, 5]);
  });

  test("Should overwrite key/value", () => {
    const value = [1, 2, 3];
    const key = "bnsf";
    db.set(key, value);
    expect(db.fetch(key)).toEqual([1, 2, 3]);
  });

  test("Should get keys", () => {
    const value = [1, 2, 3];
    db.set("upnw", value);
    expect(db.keys()).toEqual(["bnsf", "upnw"]);
  });

  test("Should clear keys", () => {
    db.clear();
    expect(db.keys()).toEqual([]);
  });
});
