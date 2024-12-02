const axios = require('axios');
//idea: use axios to redirect the request to the selected server and receive the result


async function forward(request, server){
    let forwardReq = await axios({
        method: request.method,
        url: server,
        responseType: 'stream'
    });
    return forwardReq
}

module.exports = {forward}



