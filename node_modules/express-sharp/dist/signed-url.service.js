"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlSigner = void 0;
const crypto_1 = __importDefault(require("crypto"));
const tsyringe_1 = require("tsyringe");
const url_1 = require("url");
const config_service_1 = require("./config.service");
let UrlSigner = class UrlSigner {
    constructor(config) {
        this.config = config;
    }
    makeUrlSafe(string) {
        return string.replace(/[+/_]/g, '-').replace(/=/g, '');
    }
    getSignature(string) {
        const secret = this.config.get('signedUrl.secret');
        if (!secret) {
            throw new TypeError(`Secret is missing. Please set ${config_service_1.ConfigService.GLOBAL_PREFIX}SIGNED_URL_SECRET`);
        }
        return this.makeUrlSafe(crypto_1.default
            .createHmac(this.config.get('signedUrl.algorithm', 'sha256'), secret)
            .update(string)
            .digest('base64'));
    }
    getParamName() {
        return this.config.get('signedUrl.paramName', 's');
    }
    sign(url) {
        if (typeof url === 'string') {
            url = new url_1.URL(url);
        }
        url.searchParams.set(this.getParamName(), this.getSignature(url.toString()));
        return url.toString();
    }
    verify(url) {
        if (typeof url === 'string') {
            url = new url_1.URL(url);
        }
        const signature = url.searchParams.get(this.getParamName());
        url.searchParams.delete(this.getParamName());
        return this.getSignature(url.toString()) === signature;
    }
};
UrlSigner = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], UrlSigner);
exports.UrlSigner = UrlSigner;
//# sourceMappingURL=signed-url.service.js.map