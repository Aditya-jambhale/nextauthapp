import { connectDb } from "@/dbCongif/dbConfig";
import { NextResponse } from "next/server";
connectDb();
export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successfully",
            success: true,
        })
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })
        return response
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            )
        }

    }
}