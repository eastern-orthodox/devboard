const app = require('./app');
const env = require('./config/env');
const {testConnection, pool} = require('./config/db');


async function startServer(){
  try{
    await testConnection();

    const server = app.listen(env.PORT, ()=>{
      console.log(`[SERVER] Running at http://localhost:${env.PORT}`)
    });

    const shutdown = async(signal) => {
      console.log(`\n[SERVER] Receiving signal ${signal}, turning off the server ...`);
      server.close(async()=>{
        await pool.end();
        console.log('[SERVER] Server and connection pool closed');
        process.exit(0);
      });
    };

    process.on('SIGINT',()=>shutdown('SIGINT'));
    process.on('SIGTERM',()=>shutdown('SIGTERM'));
  } catch(err){
    console.error('[SERVER] Error DB connection', err.message);
    process.exit(1);
  }
}

startServer();