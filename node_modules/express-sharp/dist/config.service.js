"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ConfigService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const dotenv_1 = require("dotenv");
const tsyringe_1 = require("tsyringe");
const util_1 = require("./util");
let ConfigService = ConfigService_1 = class ConfigService {
    constructor() {
        this.config = {
            ...(0, dotenv_1.config)().parsed,
        };
    }
    getConfig() {
        return { ...this.config, ...process.env };
    }
    expand(name) {
        return (ConfigService_1.GLOBAL_PREFIX +
            (name.includes('.')
                ? (0, util_1.camelToSnake)(name).split('.').join('_').toUpperCase()
                : name));
    }
    get(name, defaultValue) {
        const key = this.expand(name);
        const config = this.getConfig();
        return key in config ? config[key] : defaultValue;
    }
    set(name, value) {
        this.config[this.expand(name)] = value;
    }
};
ConfigService.GLOBAL_PREFIX = 'EXPRESS_SHARP_';
ConfigService = ConfigService_1 = __decorate([
    (0, tsyringe_1.singleton)()
], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map