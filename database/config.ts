import mongoose from "mongoose";

export const dbConnection = async (): Promise<void> => {
    try {
        const dbURL = process.env.DB_URL;
        if (!dbURL){
            throw new Error('DB_URL no esta definida')
        }
        await mongoose.connect(dbURL);
        console.log('Base de datos Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la DB');
    }
}