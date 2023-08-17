const express = require("express");
const fs = require('fs');
const path = require("path");
const p = path.join(path.dirname(require.main.filename),
'data',
"users.json");
const loginP = path.join(path.dirname(require.main.filename),
'data',
"login.json");

const User = require ("../models/Users")
exports.postLoginUser =(req,res)=>{
    const user = req.body;
    console.log(user," login User");
    User.login(user.email, user.password);
}
exports.getLoginUser = (req,res)=>{
    fs.readFile(loginP, (err,user)=>{
        if(!err){
            return res.send(JSON.parse(user))
        }else{
            res.send(null);
        }
    })
}
exports.postRegister =(req,res)=>{
    const user = req.body;
    const newUser = new User(user.email, user.password);
    newUser.register();
    console.log(user," newUser");
    
}
