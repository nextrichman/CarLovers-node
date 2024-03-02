
const db=require('../db/index')

const bcrypt=require('bcryptjs')

exports.getUserInfo=(req,res)=>{

    const sql='select id, username, nickname, email, user_pic from ev_users where id=?'
    console.log("ddddd")
    console.log(req.user)
    //req对象上的user属性，是token解析成功，express-jwt挂载上去的
    db.query(sql,req.user.id,(err,results)=>{
        if(err) {return res.cc(err)}
        if(results.length !== 1) {return res.cc('获取用户数据失败！')}
        res.send({
            status:0,
            message:'获取用户基本信息成功！',
            data:results[0],
        })
    })

}

exports.updateUserInfo=(req,res)=>{

    const sql='update ev_users set ? where id=?'
    db.query(sql,[req.body,req.body.id],(err,results)=>{
        if(err) {return res.cc(err)}
        if(results.affectedRows!== 1) {return res.cc('获取用户数据失败！')}
        res.cc('更新用户信息成功',0)
    })

}

exports.updatePassword=(req,res)=>{
    const sql='select * from ev_users where id=?'
    db.query(sql,req.user.id,(err,results)=>{
        if(err) {return res.cc(err)}
        if(results.length !== 1) {return res.cc('用户不存在！')}

        //判断密码是否正确
        const compareResult=bcrypt.compareSync(req.body.oldpwd,results[0].password)
        if(!compareResult){return res.cc('原密码错误!')}
        // res.cc('ok',0)
        // console.log(req.body.oldpwd,results[0].password)

        //将新密码更新到数据库中
        const sql='update ev_users set password=? where id =?'
        const newpwd=bcrypt.hashSync(req.body.newpwd,10)
        db.query(sql,[newpwd,req.user.id],(err,results)=>{
            if(err) {return res.cc(err)}
            if(results.affectedRows!== 1) {return res.cc('更新密码失败！')}
            res.cc('更新密码成功',0)
        })

    })
}

exports.updateAvatar=(req,res)=>{
    const sql='update ev_users set user_pic=? where id=?'
    db.query(sql,[req.body.avatar,req.user.id],(err,results)=>{
        if(err) {return res.cc(err)}
        if(results.affectedRows!== 1) {return res.cc('更新头像失败！')}
        res.cc('更新头像成功',0)
    })
}