const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
 
module.exports = {

    run(directoryPath) {
        console.log("delete_duplicates, path:" + directoryPath)
        // 读取目录中的所有文件
        fs.readdir(directoryPath, (err, files) => {
            
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
        
            console.log("delete_duplicates, start")
            // 创建文件MD5哈希对象
            const fileHashes = {};
        
            // 遍历每个文件
            files.forEach((file) => {
            const filePath = path.join(directoryPath, file);
            const fileStats = fs.statSync(filePath);
            if (fileStats.isFile()) {
                const content = fs.readFileSync(filePath);
                const md5 = crypto.createHash('md5');
                const md5Sum = md5.update(content).digest('hex');
                console.log("md5Sum:" + md5Sum)

                // 如果MD5已存在，则存储文件路径
                if (fileHashes[md5Sum]) {
                fileHashes[md5Sum].push(filePath);
                } else {
                fileHashes[md5Sum] = [filePath];
                }
            }
            });
        
            // 删除重复的文件
            Object.values(fileHashes).forEach((filePaths) => {
            if (filePaths.length > 1) {
                filePaths.slice(1).forEach((filePath) => {
                fs.unlink(filePath, (err) => {
                    if (err) {
                    console.log('Error deleting file:', filePath, err);
                    } else {
                    console.log('File deleted:', filePath);
                    }
                });
                });
            }
            });
        });
    }

}
