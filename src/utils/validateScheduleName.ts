import * as db from "../utils/db";
import { UserInputError } from "apollo-server";

export { validateScheduleName };

function validateScheduleName(name: string): void {
  if (!db.fetch(name)) {
    throw new UserInputError("Name not in db store keys", {
      name,
    });
  }
}
