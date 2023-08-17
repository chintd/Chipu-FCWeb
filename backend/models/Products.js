const path = require("path");
const p = path.join(path.dirname(require.main.filename),
'data',
"products.json");
const fs = require("fs");
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
module.exports = class Product {
	constructor(title, imageUrl, description, price) {
        this.title = title,
        this.imageUrl = imageUrl,
        this.description = description,
        this.price = price
	}
	save() {
        this.id = Math.random().toString();
        this.date = new Date();
        readDataFromFile(products=>{
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err=>console.log(err))
        })
	}
	static fetchAll(cb) {
        readDataFromFile(cb)
	}
    static findById(id, cb){
        readDataFromFile(prods=>{
            prods.map(el=> {
                if(el.id ===id) return cb(el)})
        })
    }
};
