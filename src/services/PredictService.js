import tf from '@tensorflow/tfjs-node';
import crypto from 'crypto';
import { ImageValidation } from './../validations/ImageValidation.js';
import { ScanError } from '../exceptions/ScanError.js';
import { Firestore } from './Firestore.js';
import { Model } from './Model.js';

export class PredictService {
    static async predict(request, h) {
        const { image } = request.payload;
        const { model } = request.server.app;

        ImageValidation.max(image, 1_000_000);

        let result;
        try {
            result = await Model.predictClassification(model, image);
        } catch (e) {
            throw new ScanError("Terjadi kesalahan dalam melakukan prediksi");
        }

        const data = {
            "id": crypto.randomUUID(),
            "result": result.label,
            "suggestion": result.suggestion,
            "createdAt": new Date()
        }

        await Firestore.store(data.id, data);

        const response = h.response({
            status: "success",
            message: "Model is predicted successfully",
            data
        });
        response.code(201);
        return response;
    }

    static async getHistories(request, h){
        const histories = await Firestore.getHistories();
        return h.response({
            status: "success",
            data: histories
        }).code(200);
    }

} 