var express = require('express');
var router = express.Router();
const fs = require('fs')
const multer  = require('multer')
var ObjectID = require('mongodb').ObjectID
const createFolder = function(folder){
    try {
        fs.accessSync(folder)
    } catch(e) {
        fs.mkdirSync(folder)
    }
}
const uploadFolder = './public/uploads/'
createFolder(uploadFolder)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder) // 保存的路径
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳 + 后缀名
        let fileFormat = (file.originalname).split('.')
        cb(null, ObjectID().toString() + '.' + fileFormat[fileFormat.length - 1])
    }
})
const upload = multer({ storage: storage })
router.get('/', function (req, res, next) {
    res.send('upload')
})

router.post('/img',upload.single('imgFile'),(req,res,next)=> {
    const file = req.file
    let path = 'http://localhost:3000/' + file.path.replace(/\\/g,'/')
    path = path.replace('/public','')
    res.send(path)
})
module.exports = router
