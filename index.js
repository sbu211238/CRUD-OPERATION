const express = require("express");
const app = express();
const port = 5000;

let item = [];

let nextid = 1;

// console.log(item);
app.get("/", (req, res) => {
    res.send("Welocome to Viku Pizza Store");
});

app.post("/add-item/:newitem", (req, res) => {
    let { newitem } = req.params;
    const newitemadded = {
        id: nextid++ ,
        name : newitem
    };
    item.push(newitemadded);
    res.send(`new item ${newitem} Added at id:${newitemadded.id}`);
});

app.get("/print-item" , (req,res)=>{
    res.send(item);
});

app.get("/print-item/:id",(req,res)=>{
    let {id} = req.params;
    let itemname = item.find(it=>it.id == id);
    let founditem = itemname?itemname.name:undefined;
    
    res.send(`item is ${founditem}`);
});

app.put("/modify-item/:id/:newname" , (req,res) => {
    let {id,newname} = req.params;

    let updatename = item.find(on => on.id == id);
    if(updatename)
    {
        updatename.name = newname;
        res.send(`value changed successfully to ${newname}`);
    }
    else{
        res.send("Item not exists");
    }
});

app.delete("/delete-item/:id" , (req,res)=>{
    let {id} = req.params;
    let index = item.find(di => di.id == id);
    if(index != -1){
        item.splice(index,1);
        res.send("Item deleted successfully");
    }
})


app.listen(port, () => {
    console.log("server started");
});