const si = require('systeminformation');

module.exports = (req, res) => {
  si.getDynamicData()
    .then(data => {
      const showData = {
        fsSize: data.fsSize,
        temp: data.temp,
        mem: data.mem
      };
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(showData));
    })
    .catch(error => console.error(error));
};
