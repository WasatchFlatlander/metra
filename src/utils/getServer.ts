import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { ScheduleResolver } from "../resolvers/ScheduleResolver";

export async function getServer(): Promise<ApolloServer> {
  const schema = await buildSchema({
    resolvers: [ScheduleResolver],
    nullableByDefault: true,
  });

  const server = new ApolloServer({
    schema,
  });
  return server;
}
