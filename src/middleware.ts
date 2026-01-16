import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // 1. Fix: Paths ko aapke folder structure ke hisab se update kiya
    const isPublicPath = path === "/user/login" || path === "/user/signup";

    const token = request.cookies.get('token')?.value || "";

    // 2. Scenario: User Logged In hai (Token hai) aur Login/Signup page khol raha hai
    if (isPublicPath && token) {
        // Fix: Yahan "/profile" ki jagah "/user/profile" kar diya
        return NextResponse.redirect(new URL("/profile", request.url));
    }

    // 3. Scenario: User Logged Out hai (Token nahi hai) aur Protected page khol raha hai
    if (!isPublicPath && !token) {
        // Fix: Yahan bhi "/user/login" kar diya
        return NextResponse.redirect(new URL("/user/login", request.url));
    }
}

// 4. Config: Matcher me wahi routes dalein jahan middleware chalna chahiye
export const config = {
    matcher: [
        "/",              // Agar home page protect karna hai to rakhein, warna hata dein
        "/user/login",
        "/user/signup",
        "/profile"
    ]
}