import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const mongoDb = process.env.MONGO_DB;
const mongoUser = process.env.MONGO_DB_USER;
const mongoPassword = process.env.MONGO_DB_PASSWORD;  

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