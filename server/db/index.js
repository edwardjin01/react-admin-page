const { Client } = require('pg')
const connectionString = 'postgresql://nexle-user:postgres@localhost:5432/testdb';
// const pool = new Pool({
//   connectionString: connectionString,
// })
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
const client = new Client({
  connectionString: connectionString,
});
client.connect();

module.exports = client;
