"use strict";
/// <reference types="vitest/globals" />
/* eslint-env jest, node */
Object.defineProperty(exports, "__esModule", { value: true });
require("@testing-library/jest-dom");
beforeAll(function () {
    vi.spyOn(console, 'warn').mockImplementation(function () { });
    vi.spyOn(console, 'error').mockImplementation(function () { });
});
afterAll(function () {
    var _a, _b, _c, _d;
    (_b = (_a = console.warn).mockRestore) === null || _b === void 0 ? void 0 : _b.call(_a);
    (_d = (_c = console.error).mockRestore) === null || _d === void 0 ? void 0 : _d.call(_c);
});
