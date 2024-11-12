"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalRequire = void 0;
function optionalRequire(packageName) {
    try {
        // eslint-disable-next-line security/detect-non-literal-require,  @typescript-eslint/no-var-requires
        return require(packageName);
    }
    catch {
        return {};
    }
}
exports.optionalRequire = optionalRequire;
//# sourceMappingURL=optional-require.js.map