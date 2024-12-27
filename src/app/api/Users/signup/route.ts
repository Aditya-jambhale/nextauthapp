import { connectDb } from "@/dbCongif/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

import { sendEmail } from "@/helpers/mailer";

connectDb();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        // Validation
        if (!username || !email || !password) {
            return NextResponse.json({ 
                error: "All fields are required" 
            }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ 
                error: "Invalid email format" 
            }, { status: 400 });
        }

        // Check if user already exists
        const usere = await User.findOne({ email});
        if (usere) {
            return NextResponse.json({ 
                error: "User already exists" 
            }, { status: 400 });
        }
        const usern = await User.findOne({username});
        if (usern) {
            return NextResponse.json({ 
                error: "User already exists" 
            }, { status: 400 });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Save user
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();

        console.log("User Saved:",savedUser);

        // Send verification email
        await sendEmail({ email, emailType: "Verify", userId: savedUser._id });

        // Exclude sensitive data from the response
        const { _id, username: savedUsername, email: savedEmail } = savedUser;
        return NextResponse.json({
            message: "User Registration Success",
            success: true,
            user: { _id, username: savedUsername, email: savedEmail },
        });

    } catch (error:any) {
        console.error("Error during registration,Please check your email or username it should be unique:", error);
        return NextResponse.json({ 
            error: error.message 
        }, { status: 500 });
    }
}
