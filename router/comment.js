const express=require ('express')
const router=express.Router()

const comment_handler=require('../router-handler/comment')

//导入验证数据的中间件
const expressJoi=require('@escook/express-joi')

//导入需要的验证规则对象
const {comment_find_schema}=require('../schema/user')

//往表中添加数据
router.post('/add',comment_handler.add)

// 获取用户基本信息的路由
// router.get('/find',expressJoi(comment_find_schema),comment_handler.find)
router.get('/find',comment_handler.find)

module.exports=router