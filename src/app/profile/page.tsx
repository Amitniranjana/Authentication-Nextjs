"use client"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation" // 1. Router import karein

// React components ka naam hamesha Capital letter se start hona chahiye
export default function ProfilePage() {

    const router = useRouter() // 2. Router initialize karein

    async function logoutFn() {
        try {
            // URL ke aage '/' lagayein taaki root se call ho
            await axios.post("/api/user/logout");

            // 3. Success message dikhayein
            toast.success("Logout successful");

            // 4. User ko Login page par bhej dein
            router.push('/user/login');

        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message || "Problem in logout");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <hr />
            <br />

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={logoutFn}
            >
                Logout
            </button>
        </div>
    )
}