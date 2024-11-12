"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = void 0;
const tsyringe_1 = require("tsyringe");
const image_url_service_1 = require("./image-url.service");
const config_service_1 = require("./config.service");
function createClient(endpoint, secret) {
    const clientContainer = tsyringe_1.container.createChildContainer();
    clientContainer.register('endpoint', { useValue: endpoint });
    if (secret) {
        clientContainer.resolve(config_service_1.ConfigService).set('signedUrl.secret', secret);
    }
    return clientContainer.resolve(image_url_service_1.ImageUrl);
}
exports.createClient = createClient;
//# sourceMappingURL=express-sharp-client.js.map