const compressing = require('compressing')


module.exports = {

    compressDir(dir, callback) {
        compressing.zip.compressDir(dir, dir + ".zip", {
            ignoreBase: true
        }).then(() => {
            callback()
        }).catch((e) => {
            console.log(e)
        })
    },

    unzip(path, callback) {
        var dir = path.substr(0, path.lastIndexOf('/') + 1)
        compressing.zip.uncompress(path, dir)
            .then(() => {
                callback()
            }).catch((e) => {
                console.log(e)
            })
    }
}