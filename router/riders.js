const express=require ('express')
const router=express.Router()

const riders_handler=require('../router-handler/riders')

//往表中添加数据
router.post('/add',riders_handler.add)

//获取用户基本信息的路由
router.get('/find',riders_handler.find)

//修改表里nickname数据
router.put('/update',riders_handler.update)

module.exports=router