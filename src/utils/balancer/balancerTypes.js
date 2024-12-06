// enums are not allowed in pure JavaScript
// solution: simulate it through a class

class BalancerType {
    static enums = ['RoundRobin', 'WeighedRoundRobin', 'IPHash'];

    static makeEnum() {
        let enumObj = Object.create(null);
        for (let enumItem of this.enums) {
            enumObj[enumItem]= enumItem;
        }
        return Object.freeze(enumObj);
    }
}

module.exports = BalancerType;


