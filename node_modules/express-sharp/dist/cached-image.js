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
exports.CachedImage = void 0;
const keyv_1 = __importDefault(require("keyv"));
const logger_1 = require("./logger");
const tsyringe_1 = require("tsyringe");
let CachedImage = class CachedImage {
    constructor(cache) {
        this.cache = cache;
        this.log = (0, logger_1.getLogger)('cached-image');
    }
    async fetch(id, adapter) {
        const cacheKey = `image:${id}`;
        let image = await this.cache.get(cacheKey);
        if (image) {
            this.log(`Serving original image ${cacheKey} from cache ...`);
            return image;
        }
        image = await adapter.fetch(id);
        if (image) {
            this.log(`Caching original image ${id} ...`);
            await this.cache.set(cacheKey, image);
        }
        return image;
    }
};
CachedImage = __decorate([
    (0, tsyringe_1.singleton)(),
    __metadata("design:paramtypes", [keyv_1.default])
], CachedImage);
exports.CachedImage = CachedImage;
//# sourceMappingURL=cached-image.js.map