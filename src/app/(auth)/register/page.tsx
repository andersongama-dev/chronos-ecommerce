"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/hooks/useRegister";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const { register, loading, error } = useRegister();
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return;
        }

        const result = await register(name, email, password, confirmPassword);

        if (result) {
            router.replace("/collection");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl p-8">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Create account
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm">
                        Join Chronos and start your journey
                    </p>
                </div>

                <form className="mt-8" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4">
                        <Input
                            placeholder="Full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

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

                        <Input
                            placeholder="Confirm password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 mt-6 rounded-xl bg-[#4455de]"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Create account"}
                    </Button>

                    {error && (
                        <p className="text-red-500 text-sm mt-2">
                            {error}
                        </p>
                    )}
                </form>

                <p className="text-center text-sm text-gray-500 mt-8">
                    Already have an account?{" "}
                    <a href="/login" className="text-[#4455de] hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
}