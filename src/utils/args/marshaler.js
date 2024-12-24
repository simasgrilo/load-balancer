/**
 * File to provide an argument marshaler for the Load Balancer. It processes all the arguments that are of form 'a=b' and ignores others
 * For now (see file creation date), its main usage is to provide ways to have a structure containing cli arguments organized as pairs of key,value
 * 
 * 
 */

class Marshaler {
    /**
     * 
     * @param {Array<String>} args 
     */
    static process(args) {
        let argumentsMap = {}
        for (let arg of args) {
            if(arg.indexOf("=") === -1) {
                continue;
            }
            arg = arg.split("=");
            let key = arg[0];
            let value = arg[1];
            argumentsMap[key] = value;
        }
        return argumentsMap;
    }
}

module.exports = Marshaler;
