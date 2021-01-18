# mishop-api
###### 使用前请先安装MongoDB，导入根目录下MiShop数据库文件
### 技术栈
- 开发语言：node.js
- 框架：express
- 构建工具：webpack
- 数据库：mongodb
# 接口文档

## 目录：
[1、获取产品分类列表](#1获取产品分类列表)<br/>
[2、获取分类所有产品](#2获取分类所有产品)<br/>
[3、获取商品详细信息](#3获取商品详细信息)<br/>
[4、搜索产品](#4根据经纬度和关键字搜索商铺列表)<br/>
[5、获取用户基本信息](#5获取用户基本信息)<br/>
[6、获取主页数据](#6获取主页数据)<br/>
[7、获取星球页推荐数据](#7获取星球页推荐数据)<br/>
[8、用户名密码登陆](#8用户名密码登陆)<br/>
[9、退出登陆](#9退出登陆)<br/>
[10、根据会话获取用户信息](#10根据会话获取用户信息)<br/>
[11、获取用户地址簿](#11获取用户地址簿)<br/>
[12、更新用户地址簿](#12更新用户地址簿)<br/>
[13、获取购物车](#13获取购物车)<br/>
[14、更新购物车](#14更新购物车)<br/>
[15、提交订单](#15提交订单)<br/>
[16、获取订单列表](#16获取订单列表)<br/>
[17、获取订单详情](#17获取订单详情)<br/>
[18、更改订单状态](#18更改订单状态)<br/>
[19、删除订单](#19删除订单)<br/>
[20、获取评论列表](#20获取评论列表)<br/>
[21、提交评论](#21提交评论)<br/>
[22、获取评论详情](#22获取评论详情)<br/>

## 1、获取产品分类列表
     
### 请求URL：
	http://localhost:3000/api/categorylist

### 请求方式：
	GET

### 参数类型：
	无

### 返回示例：

	[
	    {
	        "_id":"5e9951750d13a713bc1a1049",
	        "name":"新品",
	        "category_id":"653"
	    },
	    {
	        "_id":"5e9951750d13a713bc1a104a",
	        "name":"众筹",
	        "category_id":"940"
	    }
    ]

## 2、获取分类所有产品

### 请求URL：
	http://localhost:3000/api/category

### 请求方式：
	GET

### 参数类型：
	无

### 返回示例：
	[
	    {
	        "type":"新品",
	        "items":[
	            {
	                "_id":"5e98290f5b355e4bbc0f8dc8",
	                "goods_name":"K30 Pro 变焦版",
	                "category_img_url":"//cdn.cnbj1.fds.api.mi-img.com/mi-mall/a69571b4148f5e59c251658adae6db60.png"},{"_id":"5e9829115b355e4bbc0f8dc9","goods_name":"K30 Pro","category_img_url":"//cdn.cnbj1.fds.api.mi-img.com/mi-mall/46f95bd552fa134820a7daea19e507ef.png"
	            },
	            {
	                "_id":"5e9829295b355e4bbc0f8dd1",
	                "goods_name":"手表Color",
	                "category_img_url":"//cdn.cnbj1.fds.api.mi-img.com/mi-mall/ea816771c7470bec72a893dd0bfccee9.png"
                }
            ]
        }
    ]

### 3、获取商品详细信息

#### 请求URL：
	http://localhost:3000/api/detail

### 请求方式：
	GET

### 参数类型：query
	|参数          |是否必选  |类型     |说明|
    	|id           |Y        |string    |产品id|
    
## 4、搜索产品

### 请求URL：
	http://localhost:3000/api/search

### 示例：
[http://localhost:3000/api/search?key=盒子](http://localhost:3000/api/search?key=盒子)

### 请求方式：
	GET

### 参数类型：query
	|参数          |是否必选  |类型     |说明|
    |key         |Y      |string  |搜索关键词|

### 返回示例：
	[
	    {
	        "_id":"5e982a825b355e4bbc0f8e44",
	        "goods_name":"盒子4c",
	        "category_img_url":"//cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/5f2720471d35be10c8ffa80909b99551.png",
	        "option":[
                {
                    "title":"黑色",
                    "price":""
                }
            ],
            "key_parameters":null
        }
    ]


## 5、获取用户基本信息

### 请求URL：
	http://localhost:3000/api/user
### 示例：
[http://localhost:3000/api/user?id=5e9d8196a7684d487d932763](http://localhost:3000/api/user?id=5e9d8196a7684d487d932763)
	
### 请求方式：
    GET

### 参数类型：query
	|参数          |是否必选  |类型     |说明 |
	|id            |Y        |string   |用户id

### 返回示例：
	{
        "_id":"5e9d8196a7684d487d932763",
        "name":"admin"
    }

## 6、获取主页数据
     
### 请求URL：
	http://localhost:3000/api/home

### 请求方式：
	GET

### 返回示例：
    [
        {
            "_id":"5eb7cd90553badff89a157b5",
            "items":[
                {
                    "name":"小米10 Pro",
                    "brief":"骁龙865 / 50倍变焦",
                    "price":"4999",
                    "oldprice":"",
                    "img":"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7ed6090953a4edca0ee6bc4b36cb4a9e.jpg?thumb=1&w=344&h=280"},{"name":"小米10","brief":"骁龙865/1亿像素相机","price":"3999","oldprice":"","img":"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/9b3b7c52bffab0806c54652ee0872a64.jpg?thumb=1&w=344&h=280"},{"name":"Redmi K30","brief":"120Hz流速屏，全速热爱","price":"1599","oldprice":"1699","img":"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/64a04d4f67a23c2d8643aaba52e2392b.jpg?thumb=1&w=344&h=280"},{"name":"Redmi K30 5G","brief":"双模5G，120Hz流速屏","price":"1999","oldprice":"","img":"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/cf8c841ab5e52d443be110f6aa7e0d98.jpg?thumb=1&w=344&h=280"
                },
                {
                    "name":"Redmi Note 8 Pro",
                    "brief":"6400万全场景四摄",
                    "price":"1199",
                    "oldprice":"1399",
                    "img":"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/53e729d30746033a042d8ae9399553a7.jpg?thumb=1&w=344&h=280"},{"name":"Redmi Note 8","brief":"千元4800万四摄","price":"899","oldprice":"999","img":"https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8025107813883a20d3f2d956ad80ea38.jpg?thumb=1&w=344&h=280"
                }
            ],
            "class":"小米手机",
            "post":{
                "img":"//cdn.cnbj1.fds.api.mi-img.com/mi-mall/e32eea5c3c27062019f9ac6434b351df.jpg?thumb=1&w=720&h=440",
                "class":"小米手机"
            }
        }
    ]


## 7、获取星球页推荐数据
     
### 请求URL：
	http://localhost:3000/api/discover/recommend

### 请求方式：
	POST

### 参数类型: 请求体

	|参数		|是否必选 |类型     |说明
	|start       |Y       |number   |数据开始位置
	|end         |Y       |number   |数据结束位置


## 8、用户名密码登陆
     
### 请求URL：
	http://localhost:3000/login/login_pwd

### 请求方式：
	POST

### 参数类型: 请求体

	|参数		|是否必选 |类型     |说明
	|name       |Y       |string   |用户名
	|pwd        |Y       |string   |密码
      
     
      
### 9、退出登陆

#### 请求URL：
	http://localhost:3000/login/exitlogin

#### 请求方式：
	GET

      

### 10、根据会话获取用户信息

#### 请求URL：
	http://localhost:3000/users/info

#### 请求方式：
	GET
	
### 11、获取用户地址簿

#### 请求URL：
	http://localhost:3000/users/address

#### 请求方式：
	GET

### 12、更新用户地址簿

#### 请求URL：
	http://localhost:3000/users/updateAddress

#### 请求方式：
	POST
	
### 参数类型: 请求体

	|参数		|是否必选 |类型     |说明
	|address       |Y       |Array   |地址薄



### 13、获取购物车

#### 请求URL：
	http://localhost:3000/users/cart

#### 请求方式：
	GET
	
### 14、更新购物车

#### 请求URL：
	http://localhost:3000/users/updateCart

#### 请求方式：
	POST
### 参数类型: 请求体

	|参数		|是否必选 |类型     |说明
	|cart       |Y       |Array   |购物车列表
### 15、提交订单

#### 请求URL：
	http://localhost:3000/users/submitOrder

#### 请求方式：
	POST
### 参数类型: 请求体

	|参数		|是否必选 |类型     |说明
	|order          |Y       |Object   |订单
	
### 16、获取订单列表

#### 请求URL：
	http://localhost:3000/users/orderList

#### 请求方式：
	GET

### 17、获取订单详情

#### 请求URL：
	http://localhost:3000/users/orderView

#### 请求方式：
	GET
### 参数类型: query

	|参数		|是否必选 |类型     |说明
	|id       |Y       |string   |订单编号
	
### 18、更改订单状态

#### 请求URL：
	http://localhost:3000/users/changeOrderState

#### 请求方式：
	POST
### 参数类型: 请求体

	|参数		|是否必选 |类型     |说明
	|id       |Y       |string   |订单编号
	|step       |Y       |number   |订单状态
	
### 19、删除订单

#### 请求URL：
	http://localhost:3000/users/orderDelete

#### 请求方式：
	GET
### 参数类型: 请求体

	|参数		|是否必选 |类型     |说明
	|id       |Y       |string   |订单编号
	
### 20、提交评论

#### 请求URL：
	http://localhost:3000/comment/submit

#### 请求方式：
	POST
### 参数类型: 请求体

	|参数		|是否必选 |类型     |说明
	|comment       |Y       |object   |评论参数
	
### 21、获取评论列表

#### 请求URL：
	http://localhost:3000/comment/list

#### 请求方式：
	GET
### 参数类型: 请求体

	|参数		|是否必选 |类型     |说明
	|id       |Y       |string   |商品id
	
### 22、获取评论详情

#### 请求URL：
	http://localhost:3000/comment/view

#### 请求方式：
	GET
### 参数类型: 请求体

	|参数		|是否必选 |类型     |说明
	|id       |Y       |string   |评论编号


##### 依赖

```

npm install
```
##### 运行

```
npm run start

```
