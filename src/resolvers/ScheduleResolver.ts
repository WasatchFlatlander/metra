import * as db from "../utils/db";
import { getSortedDuplicateTimes } from "../utils/getSortedDuplicateTimes";
import { validateScheduleTimes, validateStopTime } from "../utils/validations";
import { Schedule } from "../schemas/Schedule";
import { Args, Arg, Mutation, Query, Resolver, Int } from "type-graphql";

@Resolver()
export class ScheduleResolver {
  @Mutation(() => Schedule)
  setSchedule(@Args() { name, times }: Schedule): Schedule {
    validateScheduleTimes(times);
    times.sort();
    db.set(name, times);
    return Object.assign(new Schedule(), {
      name,
      times,
    });
  }

  @Query(() => [Int])
  getSchedule(@Arg("name") name: string): number[] {
    return db.fetch(name);
  }

  @Query(() => Int)
  getNextBusyTime(@Arg("time") time: number): number | null {
    validateStopTime(time);
    const allStopTimes = db.keys().reduce((acc, key) => {
      return [...acc, ...db.fetch(key)];
    }, []);
    const sortedDuplicateStopTimes = getSortedDuplicateTimes(allStopTimes);
    const nextBusyTime = sortedDuplicateStopTimes.find((dupStopTime) => {
      return dupStopTime > time;
    });
    const firstDuplicateTime =
      sortedDuplicateStopTimes.length && sortedDuplicateStopTimes[0];
    if (nextBusyTime || firstDuplicateTime) {
      return nextBusyTime || firstDuplicateTime;
    } else {
      return null;
    }
  }
}
