"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState<string>("nothing");

    const getUserDetails = async () => {
        try {
            const res = await axios.post("/api/Users/me");
            console.log(res.data.data._id);
            setData(res.data.data._id);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                toast.error(error.message);
            }
        }
    };

    const logout = async () => {
        try {
            await axios.get("/api/Users/logout");
            toast.success("Logout successfully");
            router.push("/signup");
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                toast.error(error.message);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <hr />
            <h2>
                {data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
            </h2>
            <hr />
            <button
                className="p-2 bg-green-400 mt-2 rounded-md font-bold mb-5"
                onClick={getUserDetails}
            >
                Get My Details
            </button>
            <button
                className="p-2 bg-blue-500 mt-1 rounded-md font-bold mb-5"
                onClick={logout}
            >
                Logout
            </button>
        </div>
    );
}
