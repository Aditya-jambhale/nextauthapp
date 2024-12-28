import { connectDb } from "@/dbCongif/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

import { getDatafromToken } from "@/helpers/getDatafromToken";

connectDb();

export async function POST(request: NextRequest) {
    //extract data from token 
    try{const userid = await getDatafromToken(request)
    const user = await User.findOne({ _id: userid }).select("-password")
    //check if there is no user
    if(!user){
        return NextResponse.json(
            { message: "User not found" }, { status: 404 }
        )
    }
    return NextResponse.json({
        message: "User found",
        data: user,
    })
}catch (err: unknown) {
    if (err instanceof Error) {
        // Handle error if it's an instance of Error
        return NextResponse.json({ message: err.message });
    }
    // Fallback for non-Error types
    return NextResponse.json({ message: "An unknown error occurred" });
}
}