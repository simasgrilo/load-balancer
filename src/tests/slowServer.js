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
    }
    );
});