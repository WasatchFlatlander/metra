import * as db from "../utils/db";
import { getSortedDuplicateTimes } from "../utils/getSortedDuplicateTimes";
import { validateScheduleName } from "../utils/validateScheduleName";
import { validateStopTime } from "../utils/validateStopTime";
import { Schedule } from "../schemas/Schedule";
import { Args, Arg, Mutation, Query, Resolver, Int } from "type-graphql";

@Resolver()
export class ScheduleResolver {
  @Mutation(() => Schedule, {
    description: "Sets a schedule in db store and returns schedule.",
  })
  setSchedule(@Args() { name, times }: Schedule): Schedule {
    times.sort((a, b) => a - b);
    db.set(name, times);
    return Object.assign(new Schedule(), {
      name,
      times,
    });
  }

  @Query(() => Schedule, {
    description: "Returns a single schedule given the name of line.",
  })
  getSchedule(@Arg("name") name: string): Schedule {
    validateScheduleName(name);
    const times = db.fetch(name);
    return Object.assign(new Schedule(), {
      name,
      times,
    });
  }

  @Query(() => [Schedule], {
    description: "Get an array of all schedules at station.",
  })
  getSchedules(): Schedule[] {
    return db.keys().map((key) => {
      return Object.assign(new Schedule(), {
        name: key,
        times: db.fetch(key),
      });
    });
  }

  @Query(() => Int, {
    description:
      "Find the next time when 2 or more lines are at the station at the exact same time. If no next time, return the earliest time and null if none.",
  })
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
