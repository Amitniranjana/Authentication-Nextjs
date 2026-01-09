"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";


export default function LoginPage() {


    // State for Login (Only Email & Password needed)
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    // Universal Handle Change
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const onLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);


    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">

                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                    <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
                </div>

                <form onSubmit={onLogin} className="space-y-4">

                    {/* Email Field */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="name@company.com"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                        <input
                            name="password"
                            type="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full px-4 py-2 text-white font-semibold rounded-lg transition duration-200
                            ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                    >
                        {loading ? "Verifying..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600">
                    Do not have an account?{" "}
                    <Link href="/user/signup" className="font-medium text-blue-600 hover:underline cursor-pointer">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}