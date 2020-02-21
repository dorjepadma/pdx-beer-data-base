require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;
const data = require('./beer.js');

run();

async function run() {
    const client = new Client(process.env.DATABASE_URL);

    try {
        await client.connect();
    
        await Promise.all(
            
            data.map(beer => {
                return client.query(`
                    INSERT INTO beer (brewery, name, style, ABV,is_season, url,)
                    VALUES ($1, $2, $3, $4, $5, $6);
                `,
                    [beer.brewery, beer.name, beer.style, beer.ABV, beer.is_season, beer.url.]);
            })
        );

        console.log('seed data load complete');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        client.end();
    }
    
}