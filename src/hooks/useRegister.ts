import { useState } from "react";
import { signUp } from "@/services/auth";

type RegisterResponse = {
    accessToken: string;
};

export function useRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (
        name: string,
        email: string,
        password: string,
        confirmPassword: string
    ) => {
        setLoading(true);
        setError(null);

        try {
            const data = await signUp(name, email, password, confirmPassword);

            localStorage.setItem("token", data.accessToken);

            return data;
        } catch (err) {
            setError("Failed to create account");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error };
}