import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getDatafromToken = (request: NextRequest)=>{
    try {
        const token = request.cookies.get("token")?.value || ""
        const decodedtoken: any = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_SECRET!)
        return decodedtoken.id
    } catch (error: any) {
        throw new Error(error.message);
    }
}