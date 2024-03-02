const express=require ('express')
const router=express.Router()

const riders_handler=require('../router-handler/riders')

//往表中添加数据
router.post('/add',riders_handler.add)

//获取用户基本信息的路由
router.get('/find',riders_handler.find)

module.exports=router