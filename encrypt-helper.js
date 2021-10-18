const prompt = require("prompt");
var CryptoJS = require("crypto-js");
const fs = require("fs");

function readFile(fname) {
    var contents;
    try {
        contents = fs.readFileSync(fname, {
            encoding: "utf8",
            flag: "r",
        });
    } catch (err) {
        console.log(err.message);
        contents = null;
    }
    return contents;
}

function writeEncPassword(ciphertext, fname) {
    fs.writeFile(fname, ciphertext, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
}

var schema = {
    properties: {
        cleartext: {
            description: "Please enter the string to protect (WILL be echoed)",
        },
    },
};

function onErr(err) {
    console.log(err);
    return 1;
}

function encrypt() {
    const encFile = ".dbpasswd.enc";
    var key = readFile(".localkey");
    if (key != null) {
        prompt.start();
        prompt.get(schema, function (err, result) {
            if (err) {
                return onErr(err);
            }
            var ciphertext = CryptoJS.AES.encrypt(
                result.cleartext,
                key
            ).toString();
            console.log(`ciphertext: ${ciphertext}`);
            console.log(`writing it to ${encFile}`);
            writeEncPassword(ciphertext, encFile);
        });
    } else {
        console.log(
            "could not read key contents, have you run ./localkey.sh first?"
        );
        return 2;
    }
}

encrypt();
