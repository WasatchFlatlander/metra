import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { graphql, GraphQLSchema } from "graphql";
import { ScheduleResolver } from "../../src/resolvers/ScheduleResolver";
import * as db from "../../src/utils/db";

fdescribe("ScheduleResolver", () => {
  const ref: { schema?: GraphQLSchema } = {};

  beforeAll(async () => {
    ref.schema = await buildSchema({
      resolvers: [ScheduleResolver],
      validate: true,
      nullableByDefault: true,
    });
  });

  afterEach(() => {
    db.clear();
  });

  describe("setSchedule Mutation", () => {
    test("should return schedule properties", async () => {
      const mutation = `mutation {
            setSchedule(
              name: "bnsf",
              times: [1,2,3]
            ) {
              name, times
            }
          }`;
      const schedule = await graphql(ref.schema, mutation);
      const { name, times } = schedule.data.setSchedule;
      expect(name).toEqual("bnsf");
      expect(times).toEqual([1, 2, 3]);
    });

    test("should have set db key", async () => {
      const mutation = `mutation {
            setSchedule(
              name: "bnsf",
              times: [1,2,3]
            ) {
              name, times
            }
          }`;
      await graphql(ref.schema, mutation);
      const times = db.fetch("bnsf");
      expect(times).toEqual([1, 2, 3]);
    });

    test("should return sorted schedule times", async () => {
      const mutation = `mutation {
              setSchedule(
                name: "upnw",
                times: [3,2,1]
              ) {
                 times
              }
            }`;
      const schedule = await graphql(ref.schema, mutation);
      const { times } = schedule.data.setSchedule;
      expect(times).toEqual([1, 2, 3]);
    });
  });

  describe("getSchedule Query", () => {
    test("should return schedule times", async () => {
      const mutation = `mutation {
            setSchedule(
              name: "bnsf",
              times: [1,2,3]
            ) {
              name, times
            }
          }`;
      await graphql(ref.schema, mutation);
      const query = `query {
            getSchedule(
              name: "bnsf",
            )
          }`;
      const response = await graphql(ref.schema, query);
      const times = response.data.getSchedule;
      expect(times).toEqual([1, 2, 3]);
    });
  });

  describe("getSchedules Query", () => {
    test("should return schedule times", async () => {
      let mutation = `mutation {
            setSchedule(
              name: "bnsf",
              times: [1,2,3]
            ) {
              name, times
            }
          }`;
      await graphql(ref.schema, mutation);
      mutation = `mutation {
        setSchedule(
          name: "upnw",
          times: [2,3,4]
        ) {
          name, times
        }
      }`;
      await graphql(ref.schema, mutation);
      const query = `query {
            getSchedules {
              name,
              times
            }
          }`;
      const response = await graphql(ref.schema, query);
      const schedules = response.data.getSchedules.map((schedule) => {
        return { name: schedule.name, times: schedule.times };
      });
      expect(schedules).toEqual([
        { name: "bnsf", times: [1, 2, 3] },
        { name: "upnw", times: [2, 3, 4] },
      ]);
    });
  });

  describe("getNextBusyTime Query", () => {
    test("should return next busy time example 1", async () => {
      let mutation = `mutation {
            setSchedule(
              name: "bnsf",
              times: [10,20,30, 40]
            ) {
              name, times
            }
          }`;
      await graphql(ref.schema, mutation);
      mutation = `mutation {
            setSchedule(
              name: "upnw",
              times: [9, 20, 29, 40]
            ) {
              name, times
            }
          }`;
      await graphql(ref.schema, mutation);
      const query = `query {
            getNextBusyTime(time: 5)
          }`;
      const response = await graphql(ref.schema, query);
      const nextBusyTime = response.data.getNextBusyTime;
      expect(nextBusyTime).toEqual(20);
    });
    test("should return next busy time example 2", async () => {
      let mutation = `mutation {
              setSchedule(
                name: "bnsf",
                times: [10,20,30, 40]
              ) {
                name, times
              }
            }`;
      await graphql(ref.schema, mutation);
      mutation = `mutation {
              setSchedule(
                name: "upnw",
                times: [9, 20, 29, 40]
              ) {
                name, times
              }
            }`;
      await graphql(ref.schema, mutation);
      const query = `query {
              getNextBusyTime(time: 20)
            }`;
      const response = await graphql(ref.schema, query);
      const nextBusyTime = response.data.getNextBusyTime;
      expect(nextBusyTime).toEqual(40);
    });
    test("should return earliest busy time if none after sent time", async () => {
      let mutation = `mutation {
              setSchedule(
                name: "bnsf",
                times: [10,20,30, 40]
              ) {
                name, times
              }
            }`;
      await graphql(ref.schema, mutation);
      mutation = `mutation {
              setSchedule(
                name: "upnw",
                times: [9, 20, 29, 40]
              ) {
                name, times
              }
            }`;
      await graphql(ref.schema, mutation);
      const query = `query {
              getNextBusyTime(time: 50)
            }`;
      const response = await graphql(ref.schema, query);
      const nextBusyTime = response.data.getNextBusyTime;
      expect(nextBusyTime).toEqual(20);
    });

    test("should return null if no busy time", async () => {
      let mutation = `mutation {
                setSchedule(
                  name: "bnsf",
                  times: [10,20,30, 40]
                ) {
                  name, times
                }
              }`;
      await graphql(ref.schema, mutation);
      mutation = `mutation {
                setSchedule(
                  name: "upnw",
                  times: [9, 19, 29, 39]
                ) {
                  name, times
                }
              }`;
      await graphql(ref.schema, mutation);
      const query = `query {
                getNextBusyTime(time: 50)
              }`;
      const response = await graphql(ref.schema, query);
      const nextBusyTime = response.data.getNextBusyTime;
      expect(nextBusyTime).toBeNull();
    });
  });
});
