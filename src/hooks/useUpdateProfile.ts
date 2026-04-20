import { useState } from "react";
import { updateUserProfile } from "@/services/user"

type UserProfile = {
    name: string;
    email: string;
};

export function useUpdateProfile() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateProfile = async (
        name: string,
        email: string
    ): Promise<UserProfile | null> => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("User not authenticated");
            }

            const data = await updateUserProfile(token, name, email);

            return data;
        } catch (err) {
            setError("Failed to update profile");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { updateProfile, loading, error };
}