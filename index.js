const firebase = require('firebase');

const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert("./config/firebase_admin.json"),
    databaseURL: "https://home-cfdcd.firebaseio.com"
});


const todayFormatted = dateFormatted(new Date());
const dht = require('./sensors/dht');

if (dht.initialize()) {
    dht.read();
} else {
    console.warn('Failed to initialize sensor');
}


for (let j = 0; j < 10; j++) {

    let ref = admin.database().ref("/weather/" + todayFormatted + '/' + Date.now()).set({
        'temperature': 18.0 + j,
        'humidity': 40.5 + j
    });
}

function dateFormatted(date) {
    return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
}


