const env = process.env;
var CryptoJS = require("crypto-js");
const fs = require('fs');

function readFile(fname) {
    var contents;
    try {
        contents = fs.readFileSync(fname, {
            encoding: 'utf8',
            flag: 'r'
        });
    } catch (err) {
        console.log(err.message);
        contents = null;
    }
    return contents;
}

function decryptHelper(fname) {
    var key = readFile('.localkey');
    var ciphertext = readFile(fname);
    if (key != null && ciphertext != null) {
        var cleartext = CryptoJS.AES.decrypt(ciphertext, key).toString(CryptoJS.enc.Utf8);
        return cleartext;
    } else {
        console.log("error: could not read DB credentials from disk");
        return null;
    }
}

const config = {
    db: {
        /* do not put password or any sensitive info here, done only for demo */
        host: env.DB_HOST || 'tai.db.elephantsql.com',
        port: env.DB_PORT || '5432',
        user: env.DB_USER || 'pmvfdumg',
        password: env.DB_PASSWORD || decryptHelper('.dbpasswd.enc'),
        database: env.DB_NAME || 'pmvfdumg',
    },
    listPerPage: env.LIST_PER_PAGE || 3,
};

module.exports = config;