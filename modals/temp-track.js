const sqlite = require('sqlite');

const dbPromise = sqlite.open('./database.db', { Promise });

const insertRows = (mac, temp, hum) => {
  dbPromise.run(`INSERT INTO temps (mac, temp, hum, timestamp) VALUES (?, ?, ?, DATETIME('now','localtime'))`, [mac, temp, hum]);
};

const readAllRows = (res) => {
  dbPromise.all("SELECT * FROM temps", (err, rows) => {
    if(err) {
      console.log(err)
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(rows));
    dbPromise.close();
  });
};

module.exports = (req, res) => {
  const mac = req.query.mac;
  const temp = req.query.t;
  const hum = req.query.h;

  if(mac && temp && hum) {
    insertRows(mac, temp, hum);
  }
  Promise.all([
    sqlite.open('./database.db', { Promise })
  ]).then(function([mainDb]){
    console.log(mainDb.all("SELECT * FROM temps"))
  });
};
