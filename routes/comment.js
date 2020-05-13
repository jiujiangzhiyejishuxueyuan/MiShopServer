var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID
const mongo = require('../module/mongo')

router.get('/', function (req, res, next) {
    res.send('comment')
})

//提交评论
router.post('/submit', async (req,res,next)=> {
    const {comment} = req.body
    let {star} = comment
    await mongo.updateOne('product',[{_id:new ObjectID(comment.goodsId)},{$inc:{star: +star }}])
    checkCommentState(comment.orderId,comment.productIndex)
    const id = await mongo.insertOne('comment',{...comment})
    res.send(id)
})
//查询评论列表
router.get('/list',async (req,res,next)=> {
    let id = req.query.id
    const commentList = await mongo.find('comment',[{goodsId:id}])
    let star = await mongo.find('product',[{_id:new ObjectID(id)},{star:1}])
    star = star[0].star
    res.send({commentList,star})
})
//查询评论详情
router.get('/view',async (req,res,next)=> {
    let id = req.query.id
    const _id = new ObjectID(id)
    let comment = await mongo.find('comment',[{_id}])
    comment = comment[0]
    const userId = new ObjectID(comment.userId)
    const info = await mongo.find('user',[{_id:userId},{name:1,avatar:1,nickName:1}])
    comment.userInfo = info[0]
    res.send(comment)
})
//更改商品评论状态
async function checkCommentState(id,index) {
    const obj = {
        $set: {}
    }
    const name = `items.${index}.isComment`
    obj.$set[name] = true
    await mongo.updateOne('order',[{_id:new ObjectID(id)},obj])
}

module.exports = router
