import { PredictService } from "./../services/PredictService.js";

export default [
    {
        path: "/",
        method: "GET",
        handler(){
            return "Server is running..."
        }
    },
    {
        path: "/predict",
        method: "POST",
        handler: PredictService.predict,
        options: {
            payload: {
                allow: "multipart/form-data",
                multipart: true,
                maxBytes: 1_000_000
            }
        }
    },
    {
        path: "/predict/histories",
        method: "GET",
        handler: PredictService.getHistories,
    }
];