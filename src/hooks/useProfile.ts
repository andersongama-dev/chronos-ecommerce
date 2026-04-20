import { useState } from "react";
import { getUserProfile } from "@/services/user";

type UserProfile = {
    name: string;
    email: string;
};

export function useUserProfile() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);

    const fetchProfile = async (): Promise<UserProfile | null> => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error("User not authenticated");
            }

            const data = await getUserProfile(token);

            setProfile(data);
            return data;
        } catch (err) {
            setError("Failed to fetch user profile");
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { fetchProfile, profile, loading, error };
}