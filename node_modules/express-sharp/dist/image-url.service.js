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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUrl = void 0;
const tsyringe_1 = require("tsyringe");
const url_1 = require("url");
const config_service_1 = require("./config.service");
const interfaces_1 = require("./interfaces");
const signed_url_service_1 = require("./signed-url.service");
let ImageUrl = class ImageUrl {
    constructor(endpoint, urlSigner, config) {
        this.endpoint = endpoint;
        this.urlSigner = urlSigner;
        this.config = config;
    }
    _buildUrl(imageId, params) {
        const url = new url_1.URL(this.endpoint);
        // Endpoint w/ search params not supported
        url.search = '';
        url.pathname += imageId;
        url.pathname = url.pathname.replace(/\/\/+/, '');
        Object.entries(params)
            .filter(([, value]) => value !== undefined)
            .sort()
            .forEach(([name, value]) => {
            url.searchParams.set(interfaces_1.QueryParams[name], 
            // Type Guard in .filter() does not work:
            // > A type predicate cannot reference element 'value' in a binding
            // > pattern.
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            value.toString());
        });
        if (this.config.get('signedUrl.secret')) {
            this.urlSigner.sign(url);
        }
        return url;
    }
    url(imageId, params) {
        return this._buildUrl(imageId, params).toString();
    }
    pathQuery(imageId, params) {
        const url = this._buildUrl(imageId, params);
        return url.pathname + url.search;
    }
};
ImageUrl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('endpoint')),
    __param(1, (0, tsyringe_1.inject)(signed_url_service_1.UrlSigner)),
    __metadata("design:paramtypes", [String, Object, config_service_1.ConfigService])
], ImageUrl);
exports.ImageUrl = ImageUrl;
//# sourceMappingURL=image-url.service.js.map