var BalancerTypes = require('./balancerTypes.js');
var RoundRobin = require('./roundRobin.js')

var types = BalancerTypes.makeEnum();

class BalancerFactory {
    static getBalancer(algorithm) {
        switch (algorithm) {
            case types.RoundRobin:
                return new RoundRobin().getInstance();
            case types.WeighedRoundRobin:
                //TODO
                return null;
            case types.IPHash:
                //TODO
                return null;
        }
    }

}

module.exports = BalancerFactory;