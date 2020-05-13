var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID
const mongo = require('../module/mongo')

/* GET home page. */

router.use(express.urlencoded({ extended: true }))
router.get('/', function (req, res, next) {
    res.send('api')
})
router.get('/category', async (req, res, next) => {
    var products = []
    //查询所有分类
    mongo.find('category',[{},{}]).then(async (response)=> {
        for (let i in response) {
            const obj = {}
            obj.type = response[i].name
            obj.items = await mongo.find('product',[{category_name: response[i].name},{goods_name:1,category_img_url:1,_id:1}])
            products[i] = obj
        }
        res.send(products)
    })

})
router.get('/categorylist',async (req,res,next) => {
    const result = await mongo.find('category',[{},{}])
    res.send(result)
})
router.get('/detail',async (req,res,next) => {
    let id = req.query.id
    if(id.length!=24) {
        res.end('2')
    } else {
        id = new ObjectID(id)
        const result = await mongo.find('product',[{_id:id},{}])
        if (result.length) {
            res.send(result[0])
        } else {
            res.end('2')
        }
    }
})
router.get('/search',async (req,res,next)=> {
    let searchKey = req.query.key
    if (searchKey==='全部商品') {
        const result = await mongo.find('product',[{category_img_url:1,goods_name:1,option:1,key_parameters:1}])
        res.send(result)
    } else if(searchKey) {
        const str = new RegExp(searchKey,'i')
        const query = {$or: [{goods_name: str},{category_name: str}]}
        const result = await mongo.find('product',[query,{category_img_url:1,goods_name:1,option:1,key_parameters:1}])
        if (result.length) {
            res.send(result)
        } else {
            res.send('0')
        }
    } else {
        res.send('0')
    }
})

router.get('/user',async (req,res,next)=> {
    let id = req.query.id
    id = new ObjectID(id)
    const info = await mongo.find('user',[{_id:id},{name:1,avatar:1,nickName:1}])
    res.send(info[0])
})

router.get('/home',async (req,res,next)=> {
    const result = await mongo.find('home',[{},{}])
    res.send(result)
})

router.post('/discover/recommend',async (req,res,next)=> {
    let {start,end} = req.body
    let items = await mongo.find('discover',[{class:'recommend'}])
    items = items.slice(start,end)
    res.send(items)
})

router.use(function (req, res, next) {
    next(createError(404));
})

module.exports = router;
