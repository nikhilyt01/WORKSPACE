/* Create a middleware function that logs each incoming request’s
 HTTP method, URL, and timestamp to the console */
 const express = require("express");

const app = express();
// logs the method ,timestamp,url

function middlewares(req,res,next){
    console.log("method is:"+req.method);
    console.log("route is:"+req.url)
    console.log("host name:"+req.hostname);
    console.log("time stamp:"+new Date())
    next()
}
app.use(middlewares);            // it is used for only afterwards request
app.get("/sum", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    })
});

app.get("/multiply", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a * b
    })
});

app.get("/divide", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a / b
    })

});

app.get("/subtract", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans: a - b
    })
});

app.listen(3000);