const cron = require('node-cron');
const process = require('node:process');
const axios = require('axios');
path = process.env.serverConfig;

let args = process.argv;

const INTERNAL_ERROR = 'Internal Server Error. Please contact admin of server at '



/**
 * Static class to denote a health checker for all the servers listed
 * uses the read list of servers from reader.js in method checkHealth
 */
class Health {

    static serversHealth = [];

    static tickVal = this.getHealth() / 1000;

    static getHealth() {
        const HEALTH_TIME = 'healthTime';
        let tick = process.argv[2];
        if (!tick) {
            console.log(`Missing parameter ${HEALTH_TIME}. timer for health check set for 10s`);
            return 10000;
        }
        console.log(tick.split("="));
        tick = tick.split("=");
        let tickName = tick[0];
        let tickVal = tick[1];
        if (tick.length < 3 || tick !== 'healthTime') {
            console.log(`Missing parameter ${HEALTH_TIME}. timer for health check set for 10s`);
            return 10000;
        }
        return Number(tickVal);
    }


    /**
     * Function to schedule a cron job to check periodically the health of the servers
     * @param {Array<Server>} serversFile A list of servers configured to be used by the load balancer
     *
     */
    static async checkHealth(serversFile) {
        console.log("Health check executed");
        this.serversHealth = [];
        for (let server of serversFile){
            // let serverHealth = {
            //     name: server.name,
            // }
            try {
                let reqCheck = await axios({
                    method: 'get',
                    url: server.ip,
                    responseType: 'document'
                });
                console.log(reqCheck);
                server.status = reqCheck.status;
                server.statusText = reqCheck.statusText;
            }        
            catch (err) {
                server.status = 500,
                server.statusText = INTERNAL_ERROR + server.ip
            }
            this.serversHealth.push(server);
        }
    }
    
    static scheduleHealthCheck(serversFile){
        cron.schedule(`* * * * * `, () => {
            console.log("scheduled task started");
            this.checkHealth(serversFile);
        });
    }

    static getHealthStatus() {
        if (this.serversHealth.length === 0) {
            this.checkHealth()
        }
        return this.serversHealth;
    }

}


module.exports = Health;
