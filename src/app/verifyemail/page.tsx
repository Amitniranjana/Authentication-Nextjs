"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
// 1. Next.js ka hook import karein (URL se data nikalne ke liye)
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
    // 2. Token state ki zaroorat nahi hai, hum seedha hook use karenge
    // const [token, setToken] = useState(""); <-- Ye hata dein

    const searchParams = useSearchParams();
    const token = searchParams.get("token"); // URL se ?token=... nikal lega

    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserMail = async () => {
        try {
            // API Path check karein: Kya folder structure 'api/users/verifyemail' hai?
            await axios.post("/api/user/verifyemail", { token });
            setVerified(true);
        } catch (error: any) {
            setError(true);
            // Error handling ko thoda safe banayein
            console.log(error.response?.data || "An error occurred");
        }
    };

    useEffect(() => {
        // 3. Jaise hi token mile (aur wo empty na ho), API call kar dein
        if (token) {

            verifyUserMail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">
                {token ? `${token}` : "no token"}
            </h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/user/login" className="text-blue-500">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                </div>
            )}
        </div>
    );
}