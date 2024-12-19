import mongoose from "mongoose";
import dotenv from "dotenv"

export async function connectDb(){
    try {
        mongoose.connect(process.env.MONGO_URL!)


        const conn= mongoose.connection;
        conn.on('connected',()=>{
            console.log('Database connection established');
        })
        conn.on('error',(error)=>{
            console.error('Database connection error'+error);
        })
        process.exit();
        
    } catch (error) {
        console.error("Something went wrong",error);

    }
}