const {
    createPool
} = require('mysql');

const pool = createPool({
    host: process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
});

 pool.query('select * from ecommerce.produtos', (err, result, fields) => {
    if(err){
        return console.log(err + "<<<<<<<<<<<<<<<<<<")
    }
    return console.log('***********' + result + '***********');
})
 
exports.pool = pool;