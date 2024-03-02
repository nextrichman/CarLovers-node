const express=require('express')
const router=express.Router()

const userinfo_handler=require('../router-handler/userinfo')

//导入验证数据的中间件
const expressJoi=require('@escook/express-joi')

//导入需要的验证规则对象
const {update_userinfo_schema,update_password_schema,update_avatar_schema}=require('../schema/user')

//挂载路由
//获取用户基本信息的路由
router.get('/userinfo',userinfo_handler.getUserInfo)
//更新用户基本信息
router.put('/userinfo',expressJoi(update_userinfo_schema),userinfo_handler.updateUserInfo)
//更新密码
router.patch('/updatepwd',expressJoi(update_password_schema),userinfo_handler.updatePassword)
//更新头像
router.patch('/update/avatar',expressJoi(update_avatar_schema),userinfo_handler.updateAvatar)

module.exports=router