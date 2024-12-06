const fs = require("node:fs");
const dotenv = require("dotenv");

class Reader  {

    static  readServers(fileDir) {
        try {
            return fs.readFileSync(fileDir, 'utf-8');
        }
        catch (err) {
            console.log(err);
        }
    }

}

module.exports = Reader 