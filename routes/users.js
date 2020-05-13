var express = require('express');
var router = express.Router();
const mongo = require('../module/mongo')
var ObjectID = require('mongodb').ObjectID
// 判断是否登陆
router.use((req,res,next)=> {
  if(!req.session.name) {
    res.send('0')
  } else {
    next()
  }
})
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
})
//查用户信息
router.get('/info', async (req,res,next)=> {
  const {name} = req.session
  let info = await mongo.find('user',[{name},{name: 1,money:1,nickName:1,avatar:1}])
  info = info[0]
  res.send(info)
})
//查用户地址簿
router.get('/address',async (req,res,next)=>{
  const {name} = req.session
  const result = await mongo.find('user',[{name},{address:1}])
  const address = result[0].address
  res.send(address)
})
//更新地址簿
router.post('/updateAddress',async (req,res,next)=> {
  const {name} = req.session
  let {address} = req.body
  const oldAddress = await mongo.find('user',[{name},{address:1}])
  if (oldAddress.length<address.length) {
    let addId = address.pop()
    addId.id = ObjectID().toString()
    address.push(addId)
  }
  await mongo.updateOne('user',[{name},{$set:{address}}])
  res.send('1')
})
//查询购物车
router.get('/cart',async (req,res,next)=> {
  const {name} = req.session
  const result = await mongo.find('user',[{name},{cart:1}])
  const cart = result[0].cart
  res.send(cart)
})
//更新购物车
router.post('/updateCart',async (req,res,next)=> {
  const {name} = req.session
  let {cart} = req.body
  await mongo.updateOne('user',[{name},{$set:{cart}}])
  res.send('1')
})
//提交订单
router.post('/submitOrder',async (req,res,next)=> {
  const {name} = req.session
  let {order} = req.body
  order.userName = name
  order.createTime = Date.now()
  const id = await mongo.insertOne('order',{...order})
  res.send(id)
})
//更改订单状态
router.post('/changeOrderState',async (req,res,next)=> {
  const {name} = req.session
  let {step,id} = req.body
  const _id = new ObjectID(id)
  let user = await mongo.find('user',[{name}])
  let order = await mongo.find('order',[{_id}])
  user = user[0]
  order = order[0]
  if (step==1&&(user.money>=order.price)) {
    await mongo.updateOne('user',[{name},{$inc:{money: -order.price}}])
    await mongo.updateOne('order',[{_id},{$set:{payTime:Date.now()}}])
    res.send(id)
  } else if(step==4) {
    await mongo.updateOne('user',[{name},{$inc:{money: order.price}}])
    await mongo.updateOne('order',[{_id},{$set:{refundTime:Date.now()}}])
    res.send(id)
  } else if(step==3) {
    await mongo.updateOne('order',[{_id},{$set:{successTime:Date.now()}}])
    res.send(id)
  } else {
    res.send('0')
  }
  await mongo.updateOne('order',[{_id},{$set:{step}}])
})
//订单列表查询
router.get('/orderList',async (req,res,next)=> {
  const {name} = req.session
  const orderList = await mongo.find('order',[{userName:name},{items:1,price:1,num:1,step:1,createTime:1}])
  res.send(orderList)
})
//订单详情查询
router.get('/orderView',async (req,res,next)=> {
  let id = req.query.id
  if(id.length!=24) {
    res.end('2')
  } else {
    id = new ObjectID(id)
    const order = await mongo.find('order',[{_id:id}])
    if (order.length) {
      res.send(order[0])
    } else {
      res.end('2')
    }
  }
})
//删除订单
router.get('/orderDelete',async (req,res,next)=> {
  let {id} = req.query
  id = new ObjectID(id)
  const result = await mongo.deleteOne('order',{_id:id})
  res.send(result)
})

router.use(function(req, res, next) {
  res.end('404')
});


module.exports = router;
