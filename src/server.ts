import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { ScheduleResolver } from "./resolvers/ScheduleResolver";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [ScheduleResolver],
    nullableByDefault: true
  });

  const server = new ApolloServer({
    schema,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

bootstrap();
