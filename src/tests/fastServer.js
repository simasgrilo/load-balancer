var express = require('express');
var app = express();
const testPort = process.env.testPort || 3002;
const timeoutMs = 300;


app.listen(testPort, function () {
    console.log(`server listening at port ${testPort}`);
});

function timeout() {
    return new Promise(resolve => setTimeout(resolve, timeoutMs));
}

app.get("/", async function (req, res) {
    await timeout()//.then(function () {
    //     return res.status(200).json({
    //         "message": `Ended slow procesing after ${timeoutMs} miliseconds`
    //     });
    // }
    // );
    return res.status(200).send(`<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>Index Page</title>
            </head>
            <body>
                Hello from the web server running on port ${testPort}. I wait ${timeoutMs} to answer you.
            </body>
        </html>`);
});