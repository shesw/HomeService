"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToNumber = exports.Transform = void 0;
require("reflect-metadata");
function makePropertyMapper(prototype, key, mapper) {
    Object.defineProperty(prototype, key, {
        enumerable: true,
        set(value) {
            Object.defineProperty(this, key, {
                enumerable: true,
                get() {
                    return Reflect.getMetadata(key, this);
                },
                set(value) {
                    Reflect.defineMetadata(key, mapper(value), this);
                },
            });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            this[key] = value;
        },
    });
}
function Transform(transformer) {
    return function (target, key) {
        makePropertyMapper(target, key, transformer);
    };
}
exports.Transform = Transform;
function ToNumber() {
    return function (target, key) {
        makePropertyMapper(target, key, Number);
    };
}
exports.ToNumber = ToNumber;
//# sourceMappingURL=decorators.js.map