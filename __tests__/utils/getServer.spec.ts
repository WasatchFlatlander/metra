import "reflect-metadata";
import { getServer } from "../../src/utils/getServer";

describe("server", () => {
  test("should be able to execute valid graphql operations against server", async () => {
    const server = await getServer();
    const result = await server.executeOperation({
      query: `mutation Mutation {
        setSchedule(name: "a", times: [1,2,3]) {
          name,
          times
        }
      }`,
    });
    expect(result.errors).toBeUndefined();
    expect(result.data.setSchedule.times).toEqual([1, 2, 3]);
  });
});
