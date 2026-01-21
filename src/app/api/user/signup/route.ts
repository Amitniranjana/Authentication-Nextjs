import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel.js";
import  connect  from "@/db.config/db.config"
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
export async function POST(request:NextRequest) {
    try {

        await connect();

        const reqBody = await request.json();
        console.log(reqBody);
        const { email,password,username } = reqBody;

        console.log("request data send by frontend " ,reqBody);
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({
                error: "User already exists"
            }, { status: 400 });
        }

        const salt=await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password , salt)
        // Yahan aage user create karne ka logic aayega...
const newUser=new User({
    email,password:hashedPassword,username
})
const savedUser= await newUser.save();
console.log("saved user " ,savedUser);
sendEmail({email , emailType:"verify" , userId:savedUser._id});
        return NextResponse.json({
            message: "User check complete, ready to create",
            success: true,
savedUser
        });

    }catch (error: any) {

        console.log("Error in Signup Route:", error);

        return NextResponse.json({
            error: error.message || "Internal Server Error"
        }, { status: 500 });
    }
}