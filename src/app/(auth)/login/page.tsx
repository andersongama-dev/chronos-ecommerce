"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl p-8">
                
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-[0.02em] leading-[1.5]">
                        Login to Chronos
                    </h1>
                    <p className="text-gray-500 mt-3 text-sm tracking-[0.02em] leading-[1.5]">
                        Sign in and receive exclusive offers
                    </p>
                </div>

                <form className="mt-8">
                    <div className="flex flex-col gap-4">
                        <Input placeholder="E-mail" type="email" className="h-12 rounded-xl" />
                        
                        <div className="flex flex-col gap-2">
                            <Input placeholder="Password" type="password" className="h-12 rounded-xl" />
                            
                            <a 
                                href="/forgot-password"
                                className="text-xs text-right text-gray-500 hover:text-[#4455de] transition tracking-[0.02em] leading-[1.5]"
                            >
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full cursor-pointer h-12 mt-6 rounded-xl bg-[#4455de] hover:bg-[#5a63e6] transition-all duration-200 font-semibold tracking-[0.02em] leading-[1.5]"
                    >
                        Log in
                    </Button>
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
    )
}