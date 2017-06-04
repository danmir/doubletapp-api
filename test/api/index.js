import importDir from 'import-dir';
import supertest from 'supertest-as-promised';
import mongoose from 'mongoose';
import chai from 'chai';
import app from '../../src/server';
import {
    connectDatabase,
} from '../../src/server/db';
import { test } from '../../src/server/db/config';

import User from '../../src/server/models/User';

const routes = importDir('./routes');
const request = supertest.agent(app.listen());
const databaseConfig = process.env.MONGODB_URI || test;
chai.should();

describe('Routes', () => {
    before(async () => {
        await connectDatabase(databaseConfig);
    });

    beforeEach(async () => {
        Object.keys(mongoose.models).forEach(async name => {
            await mongoose.model(name).remove();
        });
    });

    Object.keys(routes).forEach(name => routes[name](request));
});