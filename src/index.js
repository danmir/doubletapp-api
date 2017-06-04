import 'babel-polyfill';
import 'isomorphic-fetch';
import app from './server';
import populationScript from './populationScript';
import { connectDatabase } from './server/db';
import { development, test, production } from './server/db/config';

const port = process.env.PORT || 4000;
const databaseConfig = process.env.MONGODB_URI || ((process.env.NODE_ENV == 'production') ? production : development);

(async() => {
    try {
        const info = await connectDatabase(databaseConfig);
        console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
        if (process.env.REFILL_DB == 'refill') {
            await populationScript();
        }
        await populationScript();
    } catch (error) {
        console.log(error);
        console.error('Unable to connect to database');
    }

    await app.listen(port);
    console.log(`Server started on port ${port}`);
})();
