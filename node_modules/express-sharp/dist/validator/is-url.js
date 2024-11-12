"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsUrl = exports.IsUrlConstraint = void 0;
const class_validator_1 = require("class-validator");
const url_1 = require("url");
let IsUrlConstraint = class IsUrlConstraint {
    validate(url) {
        if (!url) {
            return false;
        }
        // `url` is an absolute URI without host and protocol. Validating it by
        // by using any base URL
        const parsedUrl = new url_1.URL(url, 'https://example.com');
        return !/^\/+$/.test(parsedUrl.pathname);
    }
};
IsUrlConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)()
], IsUrlConstraint);
exports.IsUrlConstraint = IsUrlConstraint;
function IsUrl(validationOptions) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            constraints: [],
            options: validationOptions,
            propertyName: propertyName,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            target: object.constructor,
            validator: IsUrlConstraint,
        });
    };
}
exports.IsUrl = IsUrl;
//# sourceMappingURL=is-url.js.map