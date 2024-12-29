"use client";
import axios from 'axios';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function VerifyEmail() {
    const [token, setToken] = useState<string>("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    // Function to verify the email
    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/Users/verifyemail", { token });
            setVerified(true);
            toast.success("Email verified successfully!");
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(true);
                toast.error("Failed to verify email.");
                console.error(error.message || "An error occurred during email verification.");
            } else {
                console.error("Unknown error occurred", error);
            }
        }
    };

    // Extract token from URL using `URLSearchParams`
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const urlToken = searchParams.get("token");
        setToken(urlToken || "");
    }, []);

    // Automatically verify email if token is present
    // useEffect(() => {
    //     if (token) {
    //         verifyUserEmail();
    //     }
    // }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Please Verify Your Email</h1>
            <h2 className="text-black">{token ? `Token: ${token}` : "No token found"}</h2>
            <div>
                <button
                    onClick={verifyUserEmail}
                    className="p-3 bg-blue-500 border-[2px] border-white mb-5"
                >
                    Verify Email
                </button>
                {verified && (
                    <div>
                        <p className="text-green-500">Email verified successfully!</p>
                        <Link href="/login">
                        login
                        </Link>
                    </div>
                )}
                {error && (
                    <div>
                        <h2 className="text-red-700">Error verifying email</h2>
                    </div>
                )}
            </div>
        </div>
    );
}
