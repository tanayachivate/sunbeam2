const mysql=require("mysql");
var express=require("express");
var empRouter= express();

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Manager@123',
    database:'mydatabase'
});

var mydata=[];
connection.connect();

empRouter.get("/",function(req,res){
    connection.query("select * from emp",function(err,result){
        if(err==null)
        {
            mydata=result;
            res.contentType("application/json");
            res.send(JSON.stringify(mydata));
        }
        else
        {
            res.send("err");

        }
    });
});
empRouter.get("/:NO",function(req,res){
    console.log("searched for"+req.params.NO);
    var empSearched=mydata[parseInt(req.params.NO)-1];
    res.contentType("application/json");
    res.send(empSearched);
});

empRouter.post("/",function(req,res){
    let eno=parseInt(req.body.NO);
    let ename=req.body.NAME;
    let eadd=req.body.ADDRESS;
    
    let query=`insert into emp values(${eno},'${ename}','${eadd}')`;
    console.log(query);

    connection.query(query,function(err,result){
        if(err==null)
        {
            res.contentType("application/json");
            res.send(JSON.stringify(result));
        }
        else
        {
            res.contentType("application/json");
            res.send(err);

        }
    });
});


empRouter.put("/:NO",function(req,res){
    let eno=parseInt(req.params.NO);
    let ename=req.body.NAME;
    let eadd=req.body.ADDRESS;
    
    let query=`update emp set NAME='${ename}',ADDRESS='${eadd}' where NO=${eno}`;
    console.log(query);

    connection.query(query,function(err,result){
        if(err==null)
        {
            res.contentType("application/json");
            res.send(JSON.stringify(result));
        }
        else
        {
            res.contentType("application/json");
            res.send(err);

        }
    });
});

empRouter.delete("/:NO",function(req,res){
    let eno=parseInt(req.params.NO);
    let query=`delete from emp where NO=${eno}`;
    console.log(query);
    connection.query(query,function(err,result){
        if(err==null)
        {
            res.contentType("application/json");
            res.send(JSON.stringify(result));
        }
        else
        {
            res.contentType("application/json");
            res.send(err);


        }
    });

});





module.exports=empRouter;


