import { UploadedFile } from 'express-fileupload';
import * as admin from 'firebase-admin';

async function uploadToFirebase(file: UploadedFile): Promise<string> {
    const bucket = admin.storage().bucket();

    return new Promise<string>((resolve, reject) => {
        // Genera un nombre único para el archivo basado en la fecha y el nombre original
        const uniqueName = `${Date.now()}-${file.name}`;
        const blob = bucket.file(uniqueName);

        const blobStream = blob.createWriteStream();

        blobStream.on('error', (error) => {
            reject("Error uploading to Firebase Storage: " + error);
        });

        blobStream.on('finish', () => {
            // Genera la URL pública del archivo cargado
            blob.getSignedUrl({
                action: 'read',
                expires: '01-01-2025' // Puedes ajustar la fecha de expiración según tus necesidades
            }, (err, url) => {
                if (err) {
                    reject("Error generating signed URL: " + err);
                } else {
                    resolve(url as string); // Forzar el tipo de 'url' como string
                }
            });
        });

        blobStream.end(file.data);
    });
}

export default uploadToFirebase;
