import Hapi from "@hapi/hapi";
import routes from "./../routes/routes.js";
import dotenv from "dotenv";
import {Model} from "./../services/Model.js";
import { ImageMax } from "../exceptions/ImageMax.js";
import { ScanError } from "../exceptions/ScanError.js";

dotenv.config();

const server = Hapi.server({
    host: "0.0.0.0",
    port: process.env.PORT || 80,
    routes: {
        cors: {
            origin: ["*"]
        }
    }
});

server.app.model = await Model.load();
server.route(routes);

server.ext('onPreResponse', function (request, h) {
    const response = request.response;

    if (response instanceof ImageMax) {
        const newResponse = h.response({
            status: 'fail',
            message: response.message
        })
        newResponse.code(response.statusCode)
        return newResponse;
    }

    if (response instanceof ScanError) {
        const newResponse = h.response({
            status: 'fail',
            message: response.message
        })
        newResponse.code(response.statusCode)
        return newResponse;
    }

    if (response.isBoom) {
        const newResponse = h.response({
            status: 'fail',
            message: response.message
        });
        newResponse.code(response.output.statusCode)
        return newResponse;
    }

    return h.continue;
});

await server.start(routes);
console.log(`Server start at: ${server.info.uri}`);