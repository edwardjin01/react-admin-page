const { Client } = require('pg')
const connectionString = 'postgresql://postgres:postgres@138.197.63.39:5432/mydb';
// const pool = new Pool({
//   connectionString: connectionString,
// })
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
const client = new Client({
  connectionString: connectionString,
})
client.connect();

module.exports = client;