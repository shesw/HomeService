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
    }

}