var express = require('express');
var app = express();
const testPort = process.env.testPort || 3000;
const timeoutMs = 5000;


app.listen(testPort, function () {
    console.log(`server listening at port ${testPort}`);
});

function timeout() {
    return new Promise(resolve => setTimeout(resolve, timeoutMs));
}

app.get("/", function (req, res) {
    timeout().then(function () {
        return res.status(200).json({
            "message": `Ended slow procesing after ${timeoutMs} miliseconds`
        });
    }
    );
});