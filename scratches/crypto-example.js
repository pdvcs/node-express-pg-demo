var CryptoJS = require("crypto-js");

var p = "This1sA_D3mo!";
var originalText = "three rooks fly across the bright blue sky"
console.log(` orig text = '${originalText}'`);

var ciphertext = CryptoJS.AES.encrypt(originalText, p).toString();
console.log(`ciphertext = '${ciphertext}'`);

var cleartext = CryptoJS.AES.decrypt(ciphertext, p).toString(CryptoJS.enc.Utf8);
console.log(` cleartext = '${cleartext}'`);

if (originalText == cleartext) {
    console.log("all ok");
} else {
    console.log("FAIL");
}