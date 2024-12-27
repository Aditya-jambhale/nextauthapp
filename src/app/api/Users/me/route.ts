import { connectDb } from "@/dbCongif/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

import { getDatafromToken } from "@/helpers/getDatafromToken";

connectDb();

export async function POST(request: NextRequest) {
    //extract data from token 
    const userid = await getDatafromToken(request)
    const user = User.findOne({ _id: userid }).select("-password")
    //check if there is no user
    return NextResponse.json({
        message: "user found",
        data: "user"
    })
}