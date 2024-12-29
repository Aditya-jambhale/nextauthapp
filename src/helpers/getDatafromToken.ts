import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
    id: string; // Adjust based on your token's payload structure
}

export const getDatafromToken = (request: NextRequest): string | undefined => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_TOKEN_SECRET!) as DecodedToken;
        return decodedToken.id;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message); // Log the error safely
        } else {
            console.error("An unexpected error occurred:", error);
        }
        return undefined; // Return undefined in case of an error
    }
};
