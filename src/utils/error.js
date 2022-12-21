"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorFunction = (res, error = "Something Went wrong", code = 501) => {
    return res.status(code).json({ status: false, error });
};
exports.default = errorFunction;
