import { Firestore as FS } from "@google-cloud/firestore";

export class Firestore {
    static db = null;
    static async getDB() {
        if (this.db === null) {
            return Firestore.db = new FS();
        } else {
            return Firestore.db;
        }
    }

    static async store(id, data) {
        const collection = (await Firestore.getDB()).collection('predictions');
        return await collection.doc(id).set(data);
    }

    static async getHistories() {
        const collection = (await Firestore.getDB()).collection('predictions');
        const predictions = (await collection.get());
        let histories = [];
        predictions.forEach(function (doc) {
            histories.push({ id: doc.id, history: doc.data() });
        });
        histories = histories.map(function(value){
            value.history.createdAt = value.history.createdAt.toDate()
            return value
        });

        return histories;
    }
}