const axios = require('axios');
//idea: use axios to redirect the request to the selected server and receive the result
/*class that controls the forwarding algorithm. it will call the implementation of the corresponding algorithm during runtime following a strategy pattern*/
const dotenv = require('dotenv');
const BalancerFactory = require('./balancer/balancerFactory.js'); 

//TODO: read from .env the file path of the server confi

path = process.env.serverConfig;


class Forwarder {

    bal;

    constructor() {
        //use a factory to create the balancer. https://stackoverflow.com/questions/47866797/node-js-create-object-of-class-name-specified-in-variable & https://dev.to/carlillo/design-patterns---strategy-pattern-in-javascript-2hg3
        this.bal = BalancerFactory.getBalancer("RoundRobin");
        console.log(this.bal);
    }

    async forward(request){
        let forwardReq = await axios({
            method: request.method,
            url: this.bal.balance(),
            responseType: 'stream'
        });
        return forwardReq
    }

}



module.exports = Forwarder 



