import express from "express";
import cors from "cors";
import { Signale } from 'signale';
import * as admin from "firebase-admin";
import { productRouter } from "./store/Product/infraestructure/productsRoute";
import fileUpload from 'express-fileupload'; // Importa express-fileupload
import dotenv from "dotenv";

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS!);

// Inicializa la aplicación Express
const app = express();
const signale = new Signale();

// Inicializa Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: process.env.STOREAGEBUCKET
});

// Configura middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura express-fileupload
app.use(fileUpload()); // Agrega esta línea para configurar express-fileupload

// Configura las rutas
app.use('/api/v1/product', productRouter);

// Configura el puerto
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`);
});
