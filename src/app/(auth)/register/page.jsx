"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Register() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl p-8">
                
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Create account
                    </h1>
                    <p className="text-gray-500 mt-3 text-sm tracking-wide">
                        Join Chronos and start your journey
                    </p>
                </div>

                <form className="mt-8">
                    <div className="flex flex-col gap-4">
                        <Input placeholder="Full name" type="text" className="h-12 rounded-xl" />
                        <Input placeholder="E-mail" type="email" className="h-12 rounded-xl" />
                        <Input placeholder="Password" type="password" className="h-12 rounded-xl" />
                        <Input placeholder="Confirm password" type="password" className="h-12 rounded-xl" />
                    </div>

                    <Button
                        type="submit"
                        className="w-full cursor-pointer h-12 mt-6 rounded-xl bg-[#4455de] hover:bg-[#5a63e6] transition-all duration-200 font-semibold"
                    >
                        Create account
                    </Button>
                </form>

                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-sm text-gray-400">OR</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                <div className="flex gap-4">
                    <button className="w-full cursor-pointer h-12 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                        <span className="text-sm font-medium">Google</span>
                    </button>

                    <button className="w-full cursor-pointer h-12 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                        <span className="text-sm font-medium">Apple</span>
                    </button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-8">
                    Already have an account?{" "}
                    <a href="/login" className="text-[#4455de] font-medium hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    )
}