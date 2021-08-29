import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { getServer } from "./utils/getServer";

async function bootstrap(): Promise<ApolloServer> {
  const server = await getServer();
  const { url } = await server.listen();
  console.log(`🚀 Server ready at ${url}`);
  return server;
}

bootstrap();
