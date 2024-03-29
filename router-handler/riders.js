const { result } = require('@hapi/joi/lib/base')
const db=require('../db/index')

//添加数据
exports.add=(req,res)=>{
    //获取客户端传来的信息
    const userinfo=req.body
    console.log(userinfo)
    // if(!userinfo.username || !userinfo.password){
    //     // return res.send({status:1,message:'用户名或密码不能为空！'})
    //     return res.cc('用户名或密码不能为空！')
    // }
    //定义SQL语句，查询用户名是否被占用
            
        //往数据库中添加新用户
    const sql='insert into ev_riders set ?'
    db.query(sql,{title:userinfo.title,writedate:userinfo.writedate,
        publishdate:userinfo.publishdate,imgurl:userinfo.imgurl,
        content:userinfo.content,nickname:userinfo.nickname,username:userinfo.username,},(err,results)=>{
        if(err){
            // return res.send({status:1,message:err.message})
            return res.cc(err)
        }
        //判断影响行数是否为一
        if(results.affectedRows !== 1){
            // return res.send({status:1,message:'注册用户失败，请稍后再试'})
                return res.cc("发布失败，请稍后再试" )
        }
        // res.send({ status:0,message:"注册成功！" })
        res.cc("发布成功！",0)
    })
}

//查询数据
exports.find=(req,res)=>{

    const sql='SELECT * FROM ev_riders'
    db.query(sql,(err,results)=>{
        if(err) {return res.cc(err)}
        // if(results.length !== 1) {return res.cc('获取用户数据失败！')}
        res.send({
            status:0,
            message:'获取用户基本信息成功！',
            data:results,
        })
    })

}

//修改表里nickname数据
exports.update=(req,res)=>{
    const sql='update ev_riders set ? where username=?'
    db.query(sql,[req.body,req.body.username],(err,results)=>{
        if(err) {return res.cc(err)}
        // if(results.affectedRows!== 1) {return res.cc('获取用户数据失败！')}
        res.cc('更新用户信息成功',0)
    })
}