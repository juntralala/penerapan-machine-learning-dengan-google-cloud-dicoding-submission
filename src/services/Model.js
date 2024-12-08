import tf from '@tensorflow/tfjs-node';

export class Model {
    static async load() {
        return tf.loadGraphModel(process.env.MODEL_URL);
    }

    static async predictClassification(model, image) {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(score).toFixed(2);

        // const classes = ['Cancer', 'Non-cancer'];
        const label = confidenceScore > 0.5 ? "Cancer" : "Non-cancer";

        const suggestion = confidenceScore > 0.5 ? "Segera periksa ke dokter!" : "Penyakit kanker tidak terdeteksi."

        return { confidenceScore, label, suggestion };
    }
}