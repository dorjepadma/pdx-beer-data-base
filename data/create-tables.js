
require('dotenv').config();

const pg = require('pg');

const Client = pg.Client;

run();
async function run() {
    
    const client = new Client(process.env.DATABASE_URL);
    try {
       
        await client.connect();
        
        await client.query(`
            CREATE TABLE Beer (
                name VARCHAR(256) PRIMARY KEY NOT NULL,
                brewery VARCHAR(256) NOT NULL,
                style VARCHAR(256) NOT NULL,
                abv DECIMAL NOT NULL,
                is_season BOOLEAN NOT NULL,
                url VARCHAR(256) NOT NULL,
                
            );
        `);
        console.log('create tables complete');
    }
    catch (err) {
       
        console.log(err);
    }
    finally {
        // success or failure, need to close the db connection
        client.end();
    }
}