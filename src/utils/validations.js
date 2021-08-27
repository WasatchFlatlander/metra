"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateScheduleTimes = exports.validateStopTime = void 0;
const apollo_server_1 = require("apollo-server");
const getSortedDuplicateTimes_1 = require("./getSortedDuplicateTimes");
function validateStopTime(stopTime) {
    if (stopTime < 0 || stopTime > 1439) {
        throw new apollo_server_1.UserInputError("Stop time must be greater than 0 and less than 1440 (total minutes in a day)", {
            stopTime,
        });
    }
    return stopTime;
}
exports.validateStopTime = validateStopTime;
function checkForDuplicates(stopTimes) {
    const uniqueStopTimes = new Set(stopTimes);
    if (stopTimes.length !== uniqueStopTimes.size) {
        const duplicateStopTimes = getSortedDuplicateTimes_1.getSortedDuplicateTimes(stopTimes);
        throw new apollo_server_1.UserInputError("Schedule times must be unique", {
            duplicateStopTimes,
        });
    }
}
function checkForEmptyStopTimes(stopTimes) {
    if (!stopTimes.length) {
        throw new apollo_server_1.UserInputError("At least one schedule time required. Empty schedule submitted", { stopTimes });
    }
}
function checkForInvalidStopTimes(stopTimes) {
    stopTimes.forEach((stopTime) => {
        validateStopTime(stopTime);
    });
}
function validateScheduleTimes(stopTimes) {
    checkForEmptyStopTimes(stopTimes);
    checkForDuplicates(stopTimes);
    checkForInvalidStopTimes(stopTimes);
    return stopTimes;
}
exports.validateScheduleTimes = validateScheduleTimes;
