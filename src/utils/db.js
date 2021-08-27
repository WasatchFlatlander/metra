"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clear = exports.keys = exports.fetch = exports.set = void 0;
const dbMock = {};
function set(key, value) {
    dbMock[key] = value;
}
exports.set = set;
function fetch(key) {
    return dbMock[key];
}
exports.fetch = fetch;
function keys() {
    return Object.keys(dbMock);
}
exports.keys = keys;
//Added for unit testing
function clear() {
    Object.keys(dbMock).forEach((key) => {
        delete dbMock[key];
    });
    return dbMock;
}
exports.clear = clear;
