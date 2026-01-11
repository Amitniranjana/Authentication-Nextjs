"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
// If you are using Next.js, you might want to import Link
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    // One function to handle changes for all inputs
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const onSignup = async (e: FormEvent) => {
       try{
 e.preventDefault(); // Prevents page refresh
        setLoading(true);

        // Simulate API call
        console.log("Signup Data:", user);
        const response = await fetch("/api/user/signup", {
            method: "POST",
            body: JSON.stringify(user)

        });
        const responseData=await response.json();
console.log(responseData);
        if (response) {
            router.push("/user/login")
        }
       }
       catch(err){
console.log(err)
       }finally{
console.log("frontend ka signup code fat gya")
       }

    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">

                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Create an account</h1>
                    <p className="mt-2 text-sm text-gray-600">Join us to get started</p>
                </div>

                <form onSubmit={onSignup} className="space-y-4">
                    {/* Username Field */}
                    <div>
                        <label
                            htmlFor="username"
                            className="block mb-1 text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={user.username}
                            onChange={handleChange}
                            placeholder="johndoe"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-1 text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder="name@company.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-1 text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full px-4 py-2 text-white font-semibold rounded-lg transition duration-200
                            ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                    >
                        {loading ? "Processing..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/user/login"> <span className="font-medium text-blue-600 hover:underline cursor-pointer">
                        Login here
                    </span> </Link>
                </p>
            </div>
        </div>
    );
}