import { connectDb } from "@/dbCongif/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connectDb();

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json();
        const { email, password } = reqbody;
        console.log(reqbody);

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({
                error: "user not found",
                status: 400
            })
        } else {
            console.log("user exists");

        }
        const validpassword = await bcryptjs.compare(password, user.password);
        if (!validpassword) {
            return NextResponse.json({
                error: "Check Your Credentials",
                status: 500
            });
        }
        //token generation 

        const payload = {
            id: user._id,
            username: user.username
        }
        const token = await jwt.sign(payload, process.env.NEXT_PUBLIC_TOKEN_SECRET!, { expiresIn: '1d' });

        const response = NextResponse.json({
            message: "login successfully",
            success: true
        });

        response.cookies.set("token", token, {
            httpOnly: true
        });
        return response;


    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            )
        }
    }
}