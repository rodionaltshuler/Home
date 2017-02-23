var sensorLib = require('node-dht-sensor');

var dht_sensor = {
    initialize: function () {
        return sensorLib.initialize(11, 4);
    },
    read: function (callback) {
        var readout = sensorLib.read();
        console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' +
            'humidity: ' + readout.humidity.toFixed(2) + '%');
        callback(readout.temperature.toFixed(2), readout.humidity.toFixed(2));
        setTimeout(function () {
            dht_sensor.read(callback);
        }, 10000);
    }
};


module.exports = dht_sensor;