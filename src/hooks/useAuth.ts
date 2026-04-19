import { useState } from "react";
import { signIn } from "@/services/auth";

type AuthResponse = {
    accessToken: string;
};

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string): Promise<AuthResponse | null> => {
        setLoading(true);
        setError(null);

        try {
            const data = await signIn(email, password);

            localStorage.setItem("token", data.accessToken);

            return data;
        } catch (err) {
            setError("Invalid credentials");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
}