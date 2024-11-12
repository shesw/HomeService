"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpAdapter = void 0;
const logger_1 = require("../logger");
const optional_require_1 = require("../optional-require");
class HttpAdapter {
    constructor(gotOptions) {
        this.log = (0, logger_1.getLogger)('adapter:http');
        const got = (0, optional_require_1.optionalRequire)('got').default;
        this.client = got.extend({
            ...gotOptions,
        });
        this.log(`Using prefixUrl: ${this.getPrefixUrl()}`);
    }
    getPrefixUrl() {
        return this.client.defaults.options.prefixUrl;
    }
    async fetch(url) {
        var _a;
        this.log(`Fetching: ${this.getPrefixUrl()}${url}`);
        try {
            const response = await this.client.get(url, {
                responseType: 'buffer',
            });
            return response.body;
        }
        catch (error) {
            // eslint-disable-next-line no-magic-numbers
            if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.statusCode) === 404) {
                return undefined;
            }
            throw error;
        }
    }
}
exports.HttpAdapter = HttpAdapter;
//# sourceMappingURL=http.adapter.js.map