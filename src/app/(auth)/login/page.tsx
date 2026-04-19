"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const { login, loading, error } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await login(email, password);

        if (result) {
            router.replace("/collection");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl p-8">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Login to Chronos
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm">
                        Sign in and receive exclusive offers
                    </p>
                </div>

                <form className="mt-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <Input
                            placeholder="E-mail"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <a
                            href="/forgot-password"
                            className="text-xs text-right text-gray-500 hover:text-[#4455de]"
                        >
                            Forgot password?
                        </a>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 mt-6 rounded-xl bg-[#4455de] cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Log in"}
                    </Button>

                    {error && (
                        <p className="text-red-500 text-sm mt-2">
                            {error}
                        </p>
                    )}
                </form>

                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-sm text-gray-400">OR</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                <div className="flex gap-4">
                    <button className="w-full cursor-pointer h-12 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                        <span className="text-sm font-medium tracking-[0.02em] leading-[1.5]">Google</span>
                    </button>

                    <button className="w-full cursor-pointer h-12 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                        <span className="text-sm font-medium tracking-[0.02em] leading-[1.5]">Apple</span>
                    </button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-8">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-[#4455de] font-medium hover:underline tracking-[0.02em] leading-[1.5]">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}