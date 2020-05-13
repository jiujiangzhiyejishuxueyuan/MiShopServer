var express = require('express');
var router = express.Router();
const crypto = require('crypto')
const mongo = require('../module/mongo')
function cryptoPwd(pwd) {
    const sf = crypto.createHash('md5')
    sf.update(pwd)
    const value =  sf.digest('hex')
    return value
}

router.post('/login_pwd',async function(req, res, next) {
    let {pwd,name} = req.body
    pwd = cryptoPwd(pwd)
    let exist = await mongo.find('user',[{name},{}])
    exist = exist[0]
    if(!exist) {
        await mongo.insertOne('user',{name,pwd,money:860000})
        req.session.name = name
        res.end('1')
    } else if (exist.pwd===pwd) {
        req.session.name = name
        console.log(name,'登陆成功')
        res.end('1')
    } else {
        res.end('0')
    }
});
router.get('/exitlogin',(req,res,next)=> {
    const {name} = req.session
    req.session.destroy(()=> {
        console.log(`${name}退出登陆`)
    })
    res.send('1')
})
router.use(function(req, res, next) {
    res.send('404')
});

module.exports = router;
