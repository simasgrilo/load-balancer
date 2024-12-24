var BalancerTypes = require('./balancerTypes.js');
var RoundRobin = require('./roundRobin.js');
const WeighedRoundRobin = require('./weightedRR.js');

var types = BalancerTypes.makeEnum();

class BalancerFactory {
    static getBalancer(algorithm) {
        switch (algorithm) {
            case types.RoundRobin:
                return new RoundRobin().getInstance();
            case types.WeighedRoundRobin:
                return new WeighedRoundRobin().getInstance();
                return null;
            case types.IPHash:
                //TODO
                return null;
        }
    }

}

module.exports = BalancerFactory;