
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import connect from "@/db.config/db.config";
connect();
export async function POST(request: NextRequest) {
    try {
        const reqBody =await request.json();
        const { token } = reqBody;
        const user = await User.findOne({ verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
         });
        if (!user) {
            return NextResponse.json({
                message: "token is invalid",
                status: 404,
                success: false

            })
        }
     if (user) {
    user.isVerify = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({
        message:"user verify successfully",
        status:200
    })
}


    } catch (err: any) {
        console.error(err.message);
        return NextResponse.json({
            message: err.message,
            status: 404,
            success: false

        })
    }

}