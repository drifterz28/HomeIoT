const si = require('systeminformation');

// promises style - new in version 3
// si.cpuTemperature()
//     .then(data => console.log(data))
//     .catch(error => console.error(error));
//
// si.mem()
//     .then(data => console.log(data))
//     .catch(error => console.error(error));
//
// si.fsSize()
//     .then(data => console.log(data))
//     .catch(error => console.error(error));
//
// si.networkStats()
//     .then(data => console.log(data))
//     .catch(error => console.error(error));
//
// si.currentLoad()
//     .then(data => console.log(data))
//     .catch(error => console.error(error));
si.getDynamicData()
    .then(data => console.log(data))
    .catch(error => console.error(error));
