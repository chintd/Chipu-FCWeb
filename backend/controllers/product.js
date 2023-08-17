const express = require("express");
const path = require("path");
const fs = require("fs")
const p = path.join(path.dirname(require.main.filename),
'data',
"products.json");
const detailPath = path.join(path.dirname(require.main.filename),
'data',
"detail.json");
const searchPath = path.join(path.dirname(require.main.filename),
'data',
"search.json");
const Product = require("../models/Products")
exports.getFetchProducts = (req,res)=>{
    Product.fetchAll((productList)=>{
        res.send(productList)
    })
}
exports.postAddProduct = ((req, res)=>{
    console.log(req.body.product,"req.body");
    const item = req.body.product;
        const newItem = new Product(item.title, item.imageUrl, item.description, item.price);
        newItem.save();
        res.redirect("/")
})

exports.getDetail =(req,res)=>{
    const id = req.params["detailId"];
        Product.findById(id, (item)=>{
            res.send(item)
        })
}
exports.postSearchTerm = (req,res)=>{
    const searchTerm = req.body.term;
    console.log(searchTerm, 'term');
    Product.fetchAll(prods=>{
       const list = prods.filter(el=> {
            if(el.title.includes(searchTerm) || el.description.includes(searchTerm)){
                return el
            }
        });
        console.log(list, "search list");
        fs.writeFileSync(searchPath, JSON.stringify(list))
    })
}
exports.getSearchVideo = (req,res)=>{
    console.log("get search")
    fs.readFile(searchPath, (err, content)=>{
        console.log(content, "get search")
        if(!err ){
            console.log(JSON.parse(content), "parse list")
           return res.send(JSON.parse(content))
        }else{
            res.send([]);
        }
    })
}


