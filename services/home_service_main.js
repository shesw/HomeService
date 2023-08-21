const express = require('express')
const multiparty = require('multiparty')
const fs = require("fs")
const device_config = require('../src/settings/device_configs')
const path = require('path')
const compress_utils = require('../src/utils/compress_utils')
const os = require('os')
const bodyParser = require('body-parser');


const app = new express()

// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// 解析 application/json
app.use(bodyParser.json());

app.get('/home', (req, res) => {
    res.send('home service')
    res.end()
})

app.get('/text', (req, res) => {
    var t = req.query.t
    console.log(t)
    res.send('t=' + "t, extra=" + "https://www.lofter.com/cms/2072/lofterNEJSBridgeTest.html")
    res.end()
})

app.use('/public', express.static('public'))

app.post('/log', function(req, res){
    console.log(decodeURIComponent(req.body.logString))
    res.end()
})

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

app.get('/download', (req, res) => {
    var targetFileName = req.query.n
    console.log('path=' + targetFileName)
    res.download(device_config.FILE_DOWNLOAD_DIR + "/" + targetFileName, targetFileName)
})

app.get('/downloadDefault', (req, res) => {
    console.log('download default, path=' + device_config.DEFAULT_DOWNLOAD_PATH)

    var files = fs.readdirSync(device_config.DEFAULT_DOWNLOAD_PATH)

    if (files.length == 0) {
        res.end()
    } else {
        compress_utils.compressDir(device_config.DEFAULT_DOWNLOAD_PATH, () => {
            res.download(device_config.DEFAULT_DOWNLOAD_PATH + ".zip")
        })
    }
})

app.listen(7777, () => {
    console.log("home service, " + getIpAddress() + ":7777")
})

function getIpAddress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName]
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family == 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

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
        }

        fs.rename(obj.filePath, distDir + obj.originalFilename, function (error) {
            console.log('rename, error=' + error)
        })

        compress_utils.unzip(distDir + obj.originalFilename, () => {
            fs.unlink(distDir + obj.originalFilename, function (error) {
                console.log('unlink, error=' + error)
            })
        })
    }

    return obj
}