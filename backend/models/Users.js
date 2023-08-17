const path = require("path");
const p = path.join(path.dirname(require.main.filename),
'data',
"users.json");
const loginP = path.join(path.dirname(require.main.filename),
'data',
"login.json");
const fs = require("fs");
const e = require("express");
function readDataFromFile (cb){
    fs.readFile(p,(err, content)=>{
        const list = [];
        if(err){
            return cb(list)
            // console.log(JSON.parse(content));
        }else{
            return cb(JSON.parse(content))
        }
    })
}
module.exports = class User{
    constructor(email,pass){
        this.email =email;
        this.password =pass
    }
    register(){
        this.id = Math.trunc(Math.random() * 100).toString();
        readDataFromFile((usersList)=>{
            usersList.push(this);
            fs.writeFileSync(p, JSON.stringify(usersList))
        })
    }
    static login(email,pass){
        readDataFromFile(list=>{
            const user = list.find(u=>{
                if(u.email === email && u.password === pass){
                    return u
                }
            })
            fs.writeFileSync(loginP, JSON.stringify(user))
        })
    }
    static logout(){
        fs.rmSync(loginP,{
            force:true,
        })
    }
}