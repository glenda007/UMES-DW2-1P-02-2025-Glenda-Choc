import 'dotenv/config';
import { MongoClient } from 'mongodb';

const mongoHost = process.env.MONGODB_HOST;
const mongoPort = process.env.MONGODB_PORT;
const mongoDb = process.env.MONGODB_DB;
const mongoUser = process.env.MONGODB_USER;
const mongoPassword = process.env.MONGODB_PASS;  

const connectionString = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDb}`; 

const celular = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbConnection;

export const Mongocelular = {
    connectToServer: function (callback) {
        celular.connect(function (err, db) {
            if (err || !db) {
                return callback(err);
            }
            dbConnection = db.db(process.env.MONGODB_DB);
            console.log('Conectado a MongoDB');
            return callback();
        });
    },

    getDb: function () {
        return dbConnection;
    },
};