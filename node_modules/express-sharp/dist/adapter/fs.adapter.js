"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FsAdapter = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const logger_1 = require("../logger");
class FsAdapter {
    constructor(rootPath) {
        this.rootPath = rootPath;
        this.log = (0, logger_1.getLogger)('adapter:fs');
        this.log(`Using rootPath: ${rootPath}`);
    }
    async fetch(path) {
        const imagePath = (0, path_1.join)(this.rootPath, path);
        this.log(`Fetching: ${imagePath}`);
        try {
            return await fs_1.promises.readFile(imagePath);
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                return undefined;
            }
            throw error;
        }
    }
}
exports.FsAdapter = FsAdapter;
//# sourceMappingURL=fs.adapter.js.map