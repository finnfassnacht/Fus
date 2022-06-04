const express = require("express")
const crypto = require("crypto")
const router = express.Router();
const app = express()
app.use(express.json())
var database = [] 
router.post("/post", (req,res) => {
    var params_raw = (req.body)
    var hash = params_raw.hash;
    var name = params_raw.name;
    var passwd = params_raw.passwd;
    var content = params_raw.content
    var entry = {
        "hash":hash,
        "name":name,
        "content":content
    }
    if (hash == undefined || name == undefined || passwd == undefined || content == undefined){
        res.json({"error":"required parameter missing"})
        console.log({"error":"required parameter missing"})
        res.end()
    }
    else{
        const sha256Hasher = crypto.createHash("sha256");
        const server_hash = sha256Hasher.update(name + "/" + passwd).digest("hex");
        if (server_hash == hash){
            console.log("hash matches!")
            res.json({"succes":"your post was posted"})
            res.end()
            database.push(entry)
        }
        else{
            console.log("hash doesnt match!")
            res.json({"error":"hash doesnt match"})
            res.end()
        }
    }
})
router.get("/entrys", (req,res) => {
    res.json(database)
})

app.use("/fus/", router);
app.listen(8080, () => {
    console.log("server up!")
})
