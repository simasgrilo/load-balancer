const axios = require('axios');
//idea: use axios to redirect the request to the selected server and receive the result
/*class that controls the forwarding algorithm. it will call the implementation of the corresponding algorithm during runtime following a strategy pattern*/
const dotenv = require('dotenv');
const BalancerFactory = require('./balancer/balancerFactory.js'); 
const Health = require('./health.js');
const Types = require('./balancer/balancerTypes.js').makeEnum();


//TODO: read from .env the file path of the server confi

path = process.env.serverConfig;

const INTERNAL_ERROR = 'Internal Server Error. Please contact admin of server at '


class Forwarder {

    bal;
    serverStatus;

    constructor(algorithm) {
        //use a factory to create the balancer.
        // https://stackoverflow.com/questions/47866797/node-js-create-object-of-class-name-specified-in-variable & https://dev.to/carlillo/design-patterns---strategy-pattern-in-javascript-2hg3
        if (!algorithm in Types) {
            throw new TypeError(`Algorithm ${algorithm} not supported`);
        }
        this.bal = BalancerFactory.getBalancer(algorithm);
    }


    async forward(request){
        try{
            let ipReq = this.bal.balance();
            let forwardReq = await axios({
                method: request.method,
                url: ipReq //'http://127.0.0.1:3000'
                //responseType: 'document'
            });
            return forwardReq;
        }
        catch (err) {
            return {
                "statusCode" : 500,
                "errorMessage":   err.message
            }
        }

    }

    // moved to its own class (Health class)
    // async healthCheck(){
    //     let servers = this.bal.getServers();
    //     let serversHealth = {};
    //     for (let server of servers) {
    //         let serverHealth = {
    //             name: server.name,
    //         }
    //         try {
    //             let reqCheck = await axios({
    //                 method: 'get',
    //                 url: server.ip,
    //                 responseType: 'document'
    //             });
    //             console.log(reqCheck);
    //             serverHealth.status = reqCheck.status;
    //             serverHealth.statusText = reqCheck.statusText;
    //         }        
    //         catch (err) {
    //             console.log(err);
    //             console.log("oh no");
    //             serverHealth.status = 500,
    //             serverHealth.statusText = INTERNAL_ERROR + server.ip
    //         }
    //         serversHealth[server.ip] = serverHealth;
    //     }
    //     return serversHealth; 
    // }

    getHealthCheck(serversList) {
        return Health.getHealthStatus(serversList);
    }

}



module.exports = Forwarder 



