"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelToSnake = void 0;
function camelToSnake(string) {
    return string
        .replace(/\w([A-Z])/g, (m) => {
        return `${m[0]}_${m[1]}`;
    })
        .toLowerCase();
}
exports.camelToSnake = camelToSnake;
//# sourceMappingURL=util.js.map