export class ImageMax extends Error {
    constructor(message, statusCode = 413){
        super(message);
        this.statusCode = statusCode;
    }
} 