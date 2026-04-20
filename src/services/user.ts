export async function getUserProfile(token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to fetch user profile");
    }

    return response.json();
}

export async function updateUserProfile(
    token: string,
    name: string,
    email: string
) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to update profile");
    }

    return response.json();
}