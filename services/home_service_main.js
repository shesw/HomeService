const express = require('express')
const multiparty = require('multiparty')
const fs = require("fs")

const app = new express()

const FILE_SAVE_DIR = "/Users/shesw/Sheswland/uploads/"

app.get('/home', (req, res) => {
    res.send('home service')
    res.end()
})

app.post("/upload", function (req, res) {
    /* 生成multiparty对象，并配置上传目标路径 */
    let form = new multiparty.Form();
    // 设置编码 
    form.encoding = 'utf-8';
    // 设置文件存储路径，以当前编辑的文件为相对路径
    form.uploadDir = FILE_SAVE_DIR;
    // 设置文件大小限制
    // form.maxFilesSize = 1 * 1024 * 1024;
    form.parse(req)

    form.on('field', (name, value) => { // 接收到数据参数时，触发field事件
        console.log(name, value)
    })

    form.on('file', (name, file, ...rest) => { // 接收到文件参数时，触发file事件
        console.log(name, file)

        var originalFilename = file.originalFilename

        if (fs.existsSync(FILE_SAVE_DIR + originalFilename)) {
            fs.unlink(file.path, function (error) {
                console.log('unlink, error=' + error)
            })
        } else {
            fs.rename(file.path, FILE_SAVE_DIR + originalFilename, function (error) {
                console.log('rename, error=' + error)
            })
        }

    })

    form.on('close', () => { // 表单数据解析完成，触发close事件
        console.log('表单数据解析完成')
    })
});

app.listen(7777, () => {
    console.log("home service")
})