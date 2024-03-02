//导入验证规则的包
const joi=require('joi')

//定义用户名和密码的验证规则  
const username=joi.string().alphanum().min(1).max(10).required()
const password=joi.string().pattern(/^[\S]{6,12}$/).required()


const id1=joi.number().integer().min(1).required()
const nickname1=joi.string().required()
const email1=joi.string().email().required()

const avatar=joi.string().dataUri().required()//dataUri是指base64格式的

const id2=joi.number().integer().required()
//导出注册和登录的表单数据规则对象
exports.reg_login_schema={
    body:{
        username,
        password,
    },
}

//验证规则对象,更新用户基本信息  当上面的验证规则名字和下面的名字相同就可以简写
exports.update_userinfo_schema={
    body:{
        id:id1,
        nickname:nickname1,
        email:email1,        
    }
}

exports.update_password_schema={
    body:{
        oldpwd:password,
        newpwd:joi.not(joi.ref('oldpwd')).concat(password)
    }
}

exports.update_avatar_schema={
    body:{
        avatar,
    },
}


exports.comment_find_schema={
    body:{newsid:id2},
}