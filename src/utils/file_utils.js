const fs = require("fs")
const path = require('path')

module.exports = {

    mkdirs(directoryPath) {
        if (!fs.existsSync(directoryPath)) {
            const parentDir = path.dirname(directoryPath);
            this.mkdirs(parentDir);
            fs.mkdirSync(directoryPath);
          }
    }
}