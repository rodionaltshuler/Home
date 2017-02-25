const firebase = require('firebase');

const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert("./config/firebase_admin.json"),
    databaseURL: "https://home-cfdcd.firebaseio.com"
});


const dht = require('./sensors/dht');

setupLogging('debug.log');

if (dht.initialize()) {
    dht.read((temperature, humidity) => {
        const todayFormatted = dateFormatted(new Date());
        try {
            admin.database().ref("/weather/" + todayFormatted + '/' + Date.now()).set({
                temperature,
                humidity
            });
        } catch (err) {
            console.log(err);
        }
    });
} else {
    console.warn('Failed to initialize sensor');
}

function dateFormatted(date) {
    return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
}

function setupLogging(filename) {
    const fs = require('fs');
    const util = require('util');
    const log_file = fs.createWriteStream(__dirname + '/' + filename, {flags: 'w'});
    const log_stdout = process.stdout;

    console.log = function (d) { //
        log_file.write(util.format(d) + '\n');
        log_stdout.write(util.format(d) + '\n');
    };
}