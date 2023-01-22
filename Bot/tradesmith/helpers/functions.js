"use strict";
exports.__esModule = true;
exports.print = exports.setFileName = void 0;
//@ts-ignore
var fs_1 = require("fs");
var FILE_NAME;
function setFileName(name) {
    FILE_NAME = name;
}
exports.setFileName = setFileName;
function print(text) {
    console.log(text);
    (0, fs_1.appendFile)(FILE_NAME, "".concat(text, "\n"), function (err) {
        // In case of a error throw err.
        if (err)
            throw err;
    });
}
exports.print = print;
