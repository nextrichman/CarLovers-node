//导入express模块
const express = require('express')

//创建express实例
const app= express()

const joi=require('joi')

//导入并配置cros中间件 解决跨域
const cors=require('cors')
app.use(cors())

//配置解析表单数据的中间件，这个中间件只能解析application/x-www-form-urlencoded格式的表单数据   
app.use(express.urlencoded({extended:false}))

//封装res.cc函数
app.use( (req,res,next)=>{
    //status默认值为一，表示失败的情况
    //err的值，可能是一个错误对象，也可能是一个错误的描述字符串
    res.cc = function (err,status = 1){
        res.send({
            status,
            message:err instanceof Error ? err.message:err
        })
    }
    next()
})

//一定要在路由之前配置解析Token的中间件
const config=require('./config')
const expressJWT=require('express-jwt')

// console.log(expressJWT({secret:config.expiresIn}))
app.use(expressJWT({secret:config.jwtsecretKey}).unless({path:[/^\/api/]}))//expressJWT()解析token .unless中指定哪些接口不需要用token验证
//当需要访问不是/api开头的就需要在header中添加key：Authorization,value:能成功登录的编译好的token


//导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api',userRouter)
//导入并使用用户信息路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my',userinfoRouter)
//导入并使用车友文章信息路由模块
const ridersRouter = require('./router/riders')
app.use('/article',ridersRouter)
//导入并使用评论信息路由模块
const commentRouter = require('./router/comment')
app.use('/comment',commentRouter)



//定义错误级别的中间件
app.use((err,req,res,next)=>{
    //验证失败导致的错误
    if(err instanceof joi.ValidationError) return res.cc(err)
    //
    if(err.name === 'UnauthorizedError') {return res.cc('身份认证失败！')}
    //未知的错误
    res.cc(err)
})

//监听3000端口
app.listen(3000,()=>{
    console.log('api are runing at http://127.0.0.1:3000')
})