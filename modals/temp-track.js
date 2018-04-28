const sqlite3 = require('sqlite3').verbose();
let db;

const createDb = () => {
  db = new sqlite3.Database('temps.sqlite3', createTable);
};

const createTable = (mac, temp, hum) => {
  db.run("CREATE TABLE IF NOT EXISTS temps (id INTEGER PRIMARY KEY AUTOINCREMENT, mac TEXT, temp REAL, hum REAL, timestamp TEXT)");
};

const insertRows = (mac, temp, hum) => {
  console.log(new Date())
  db.run(`INSERT INTO temps (mac, temp, hum, timestamp) VALUES (?, ?, ?, DATETIME('now','localtime'))`, [mac, temp, hum]);
};

const readAllRows = (res) => {
  db.all("SELECT * FROM temps", (err, rows) => {
    if(err) {
      console.log(err)
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(rows));
    db.close();
  });
};

module.exports = (req, res) => {
  const mac = req.query.mac;
  const temp = req.query.t;
  const hum = req.query.h;
  createDb();

  if(mac && temp && hum) {
    insertRows(mac, temp, hum);
  }

  readAllRows(res);
};
