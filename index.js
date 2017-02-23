const firebase = require('firebase');

const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert("./config/firebase_admin.json"),
    databaseURL: "https://home-cfdcd.firebaseio.com"
});


const dht = require('./sensors/dht');

if (dht.initialize()) {
    dht.read((temperature, humidity) => {
        const todayFormatted = dateFormatted(new Date());
        admin.database().ref("/weather/" + todayFormatted + '/' + Date.now()).set({
            temperature,
            humidity
        });
    });
} else {
    console.warn('Failed to initialize sensor');
}

function dateFormatted(date) {
    return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
}


