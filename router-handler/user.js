const { result } = require('@hapi/joi/lib/base')
const db=require('../db/index')

const bcrypt=require('bcryptjs')//密码加密

const jwt=require('jsonwebtoken')//生成token的包

const config=require('../config')//导入全局配置文件

//注册处理函数
exports.reguser=(req,res)=>{
    //获取客户端传来的信息
    const userinfo=req.body
    console.log(userinfo)
    // if(!userinfo.username || !userinfo.password){
    //     // return res.send({status:1,message:'用户名或密码不能为空！'})
    //     return res.cc('用户名或密码不能为空！')
    // }
    //定义SQL语句，查询用户名是否被占用
    const sqlStr='select * from ev_users where username=?'
    db.query(sqlStr,userinfo.username,(err,results)=>{
        //执行sql语句失败
        if(err){
            // return res.send({status:1,message:err.message})
            return res.cc(err)
        }
        //判断用户名是否被占用
        if(results.length>0){
            // return res.send({status:1,message:'用户名被占用，请更换其他用户名！'})
            return res.cc('用户名被占用，请更换其他用户名！')
        }
        //TODO:用户名可以使用没被他人使用

        //对password加密
        userinfo.password=bcrypt.hashSync(userinfo.password,10)
        
        //往数据库中添加新用户
        const sql='insert into ev_users set ?'
        db.query(sql,{username:userinfo.username,password:userinfo.password},(err,results)=>{
            if(err){
                // return res.send({status:1,message:err.message})
                return res.cc(err)
            }
            //判断影响行数是否为一
            if(results.affectedRows !== 1){
                // return res.send({status:1,message:'注册用户失败，请稍后再试'})
                return res.cc("注册用户失败，请稍后再试" )
            }
            // res.send({ status:0,message:"注册成功！" })
            res.cc("注册成功！",0)
        })
    })
}

//登录处理函数
exports.login=(req,res)=>{
    const userinfo=req.body
    console.log(userinfo)
    const sql='select * from ev_users where username=?'

    db.query(sql,userinfo.username,(err,results)=>{
        //执行sql语句失败
        if(err){
            return res.cc(err)}
        //执行sql语句成功但是获取条数不为一条
        if(results.length!==1){
            return res.cc('登录失败！')}
        //TODO验证密码是否正确
        const compareResult=bcrypt.compareSync(userinfo.password,results[0].password)
        if(!compareResult){
            return res.cc('登陆失败')
        }
        //排除密码和用户图片来生成token es6语法
        const user={...results[0],password:'',user_pic:''}
        //TODO 生成token字符串使用 jsonwebtoken包的sign方法
        //console.log(user)
        const tokenStr=jwt.sign(user,config.jwtsecretKey,{expiresIn:config.expiresIn})
        //console.log(tokenStr)
        res.send({
            status:0,
            message:'登陆成功',
            token:'Bearer '+tokenStr,
        })
    })
}