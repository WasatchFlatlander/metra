"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortedDuplicateTimes = void 0;
function getSortedDuplicateTimes(allStopTimes) {
    let duplicateStopTimes = [];
    allStopTimes.reduce((acc, stopTime) => {
        const timeCount = acc[stopTime];
        if (timeCount) {
            if (timeCount === 1) {
                duplicateStopTimes.push(stopTime);
            }
            acc[stopTime] = acc[stopTime] + 1;
        }
        else {
            acc[stopTime] = 1;
        }
        return acc;
    }, {});
    duplicateStopTimes.sort();
    return duplicateStopTimes;
}
exports.getSortedDuplicateTimes = getSortedDuplicateTimes;
