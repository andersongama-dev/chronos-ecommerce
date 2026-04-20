"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
    open: boolean;
    onClose: () => void;
    initialName?: string;
    initialEmail?: string;
    onSave: (name: string, email: string) => Promise<void>;
};

export default function EditProfileModal({
    open,
    onClose,
    initialName = "",
    initialEmail = "",
    onSave,
}: Props) {
    const [name, setName] = useState(initialName);
    const [email, setEmail] = useState(initialEmail);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setName(initialName);
        setEmail(initialEmail);
    }, [initialName, initialEmail]);

    if (!open) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await onSave(name, email);
            onClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4">Edit profile</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Input
                        placeholder="E-mail"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Button
                        type="button"
                        variant="outline"
                        className="h-11 cursor-pointer"
                        onClick={() => alert("Implement change password flow")}
                    >
                        Change password
                    </Button>

                    <Button
                        type="submit"
                        className="h-12 bg-[#4455de] cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save changes"}
                    </Button>
                </form>

                <button
                    onClick={onClose}
                    className="mt-4 text-sm text-gray-500 cursor-pointer"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}