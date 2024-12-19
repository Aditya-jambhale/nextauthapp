import { connectDb } from "@/dbCongif/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

import { sendEmail } from "@/helpers/mailer";

connectDb()

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const reqBody = await request.json();
        //destructuring the request
        const { username, email, password } = reqBody

        //validation 
        console.log(reqBody);

        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: "User already exists" },
                { status: 400, }
            )
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new user({
            username: username,
            email: email,
            password: hashedPassword
        })
        const savedUser = await newUser.save();
        console.log("User Saved", savedUser);
        //send verification email
        await sendEmail({ email, emailType: "Verify", userId: savedUser._id })
        return NextResponse.json({
            message: "User Registration Success",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 }
        );
    }
}