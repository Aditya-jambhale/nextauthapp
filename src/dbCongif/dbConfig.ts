import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export async function connectDb() {
    try {
        const conn = mongoose.connection;
        conn.on("connected", () => {
            console.log("Database connection established");
        });
        conn.on("error", (error) => {
            console.error("Database connection error: " + error);
        });
        // Connect to MongoDB
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI!)
    } catch (error) {
        if (error instanceof Error) {
            console.error("Failed to connect to the database",error.message); // Access the message property safely
        } else {
            console.error("An unexpected error occurred:", error);
        }
    }
}
