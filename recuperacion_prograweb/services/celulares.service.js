import { Mongocelular } from '../configs/mongodb.config.js';
import { ObjectId } from 'mongodb';

const collectionName = 'celulares';

const celularesService = {
    getAll: async () => {
        try {
            const db = Mongocelular.getDb();
            return await db.collection(collectionName).find({}).toArray();
        } catch (error) {
            throw error;
        }
    },
    
    getById: async (id) => {
        try {
            const db = Mongocelular.getDb();
            return await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
        } catch (error) {
            throw error;
        }
    },
    
    create: async (celular) => {
        try {
            const db = Mongocelular.getDb();
            const result = await db.collection(collectionName).insertOne(celular);
            return { ...celular, _id: result.insertedId };
        } catch (error) {
            throw error;
        }
    },

    checkDuplicate: async (nombreAlumno) => {
        try {
            const db = Mongocelular.getDb();
            const existing = await db.collection(collectionName).findOne({ nombreAlumno });
            return existing !== null;
        } catch (error) {
            throw error;
        }
    }
};

export default celularesService;