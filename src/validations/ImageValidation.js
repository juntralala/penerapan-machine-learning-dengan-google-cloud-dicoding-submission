import { ImageMax } from "./../exceptions/ImageMax.js";

export class ImageValidation {
    static max(image, max = 1_000_000) {
        const imageSize = parseInt(image._data?.length || 0, 10);
        if (imageSize > max) {
            throw new ImageMax(`Payload content length greater than maximum allowed: ${max}`);
        }
    }
}