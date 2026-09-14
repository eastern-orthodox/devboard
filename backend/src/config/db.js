const {Pool} = require('pg')
const env = require('./env')

const pool = new Pool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

pool.on('error', (err)=>{
    console.error('[DB] Unexpected error on idle client',err);
    process.exit(1);
});

async function query(){
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;

    if (env.NODE_ENV === 'development'){
        console.log('[DB] executed query', {text, duration, rows: res.rowCount});
    }
    return res; 
}

async function testConnection(){
    try{
        const client = await pool.connect();
        const result = await client.query('SELECT NOW()');
        client.release();
        console.log('[DB] PostgreSQL connected successfully', result.rows[0].now);
        return true; 
    }
    catch(err){
        console.error('[DB] PostgreSQL connected unsuccessfully', err.message);
        throw err;
    }
}

module.exports = {
    pool, query, testConnection
}