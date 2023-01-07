const express = require('express')
const multiparty = require('multiparty')
const fs = require("fs")
const device_config = require('./device_configs')
const path = require('path')

const app = new express()

app.get('/home', (req, res) => {
    res.send('home service')
    res.end()
})

app.use('/public', express.static('public'))

app.post("/upload", function (req, res) {
    try {
        /* 生成multiparty对象，并配置上传目标路径 */
        let form = new multiparty.Form();
        // 设置编码 
        form.encoding = 'utf-8';
        // 设置文件存储路径，以当前编辑的文件为相对路径
        form.uploadDir = device_config.FILE_SAVE_DIR;
        // 设置文件大小限制
        // form.maxFilesSize = 1 * 1024 * 1024;
        form.parse(req)

        var fileHandler = FileHander()

        form.on('field', (name, value) => { // 接收到数据参数时，触发field事件
            console.log('on field')
            console.log(name, value)
            if (name == 'saveDir') {
                fileHandler.saveDir = value
                if (fileHandler.saveDir == null || fileHandler.saveDir == '' || fileHandler.saveDir == undefined) {
                    fileHandler.saveDir = '/'
                }
                fileHandler.handle()
            }
        })

        form.on('file', (name, file, ...rest) => { // 接收到文件参数时，触发file事件
            console.log('on file')
            console.log(name, file)

            fileHandler.originalFilename = file.originalFilename
            fileHandler.filePath = file.path
            fileHandler.handle()
            res.end()
        })

        form.on('close', () => { // 表单数据解析完成，触发close事件
            console.log('表单数据解析完成')
        })
    } catch (e) {
        console.log('upload fail, e=' + e)
        res.send(e)
        res.end()
    }

});

app.get('/downloadapk', (req, res) => {
    console.log(device_config.APK_DOWNLOAD_PATH)
    res.download(device_config.APK_DOWNLOAD_PATH, 'FLHS.apk')
})

app.get('/download/*', (req, res) => {
    console.log('path=' + req.params[0])
    res.download(req.params[0])
})

app.get('/downloadDefault', (req, res) => {
    console.log('download default, path=' + device_config.DEFAULT_DOWNLOAD_PATH)

    var files = fs.readdirSync(device_config.DEFAULT_DOWNLOAD_PATH)

    files.forEach((f) => {
        var file = device_config.DEFAULT_DOWNLOAD_PATH + f
        console.log(file)
        res.download(file)
    })
})

app.listen(7777, () => {
    console.log("home service")
})

function FileHander() {

    var obj = new Object
    obj.saveDir = ''
    obj.filePath = ''
    obj.originalFilename = ''

    obj.handle = function () {
        console.log('saveDir=' + obj.saveDir + ", filePath=" + obj.filePath)

        if (obj.saveDir == null || obj.saveDir == '' || obj.saveDir == undefined) {
            return
        }
        if (obj.filePath == null || obj.filePath == '' || obj.filePath == undefined) {
            return
        }
        if (obj.originalFilename == null || obj.originalFilename == '' || obj.originalFilename == undefined) {
            return
        }

        var distDir = device_config.FILE_SAVE_DIR + obj.saveDir

        if (!fs.existsSync(distDir)) {
            fs.mkdirSync(distDir)
        }

        if (fs.existsSync(distDir + obj.originalFilename)) {
            fs.unlink(obj.filePath, function (error) {
                console.log('unlink, error=' + error)
            })
        } else {
            fs.rename(obj.filePath, distDir + obj.originalFilename, function (error) {
                console.log('rename, error=' + error)
            })
        }
    }

    return obj
}