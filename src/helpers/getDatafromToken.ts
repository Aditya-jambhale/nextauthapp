import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getDatafromToken = (request: NextRequest)=>{
    try {
        const token = request.cookies.get("token")?.value || ""
        const decodedtoken:any= jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_SECRET!)
        return decodedtoken.id
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message); // Access the message property safely
        } else {
            console.error("An unexpected error occurred:", error);
        }
    }
}