import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import  connect  from "@/db.config/db.config"; // Ensure you connect to DB
import jwt from "jsonwebtoken"
// 1. Function must be async and a named export
export async function POST(request: NextRequest) {
  try {
    // Connect to DB first (if not already handled globally)
    await connect();

    // 2. Await the json() method
    const { email, password } = await request.json();

    // 3. Find user by object
    const user = await User.findOne({ email });

    // Check if user exists first
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 }
      );
    }

    // 4. Compare: (Plain Input, Stored Hash)
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // write token data
     const tokenData={
      id:user._id,
      email:user.email,
      username:user.username
     }
// create token
const token=await jwt.sign(tokenData ,process.env.TOKEN_SECRET_KEY!,{expiresIn:"1h"})

    const response= NextResponse.json(
        { message: "logged in successfully" },
        { status: 200 }
      );
      response.cookies.set("token" , token,{httpOnly:true });
      return response;
    } else {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}