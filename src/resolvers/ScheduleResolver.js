"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleResolver = void 0;
const db = __importStar(require("../utils/db"));
const getSortedDuplicateTimes_1 = require("../utils/getSortedDuplicateTimes");
const validations_1 = require("../utils/validations");
const Schedule_1 = require("../schemas/Schedule");
const type_graphql_1 = require("type-graphql");
let ScheduleResolver = class ScheduleResolver {
    setSchedule({ name, times }) {
        validations_1.validateScheduleTimes(times);
        times.sort();
        db.set(name, times);
        return Object.assign(new Schedule_1.Schedule(), {
            name,
            times,
        });
    }
    getSchedule(name) {
        return db.fetch(name);
    }
    getNextBusyTime(time) {
        validations_1.validateStopTime(time);
        const allStopTimes = db.keys().reduce((acc, key) => {
            return [...acc, ...db.fetch(key)];
        }, []);
        const sortedDuplicateStopTimes = getSortedDuplicateTimes_1.getSortedDuplicateTimes(allStopTimes);
        const nextBusyTime = sortedDuplicateStopTimes.find((dupStopTime) => {
            return dupStopTime > time;
        });
        const firstDuplicateTime = sortedDuplicateStopTimes.length && sortedDuplicateStopTimes[0];
        if (nextBusyTime || firstDuplicateTime) {
            return nextBusyTime || firstDuplicateTime;
        }
        else {
            return null;
        }
    }
};
__decorate([
    type_graphql_1.Mutation(() => Schedule_1.Schedule),
    __param(0, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Schedule_1.Schedule]),
    __metadata("design:returntype", Schedule_1.Schedule)
], ScheduleResolver.prototype, "setSchedule", null);
__decorate([
    type_graphql_1.Query(() => [type_graphql_1.Int]),
    __param(0, type_graphql_1.Arg("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Array)
], ScheduleResolver.prototype, "getSchedule", null);
__decorate([
    type_graphql_1.Query(() => type_graphql_1.Int),
    __param(0, type_graphql_1.Arg("time")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Number)
], ScheduleResolver.prototype, "getNextBusyTime", null);
ScheduleResolver = __decorate([
    type_graphql_1.Resolver()
], ScheduleResolver);
exports.ScheduleResolver = ScheduleResolver;
