export async function signIn(email: string, password: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Login failed");
    }

    return response.json();
}

export async function signUp(
    name: string,
    email: string,
    password: string,
    confirmPassword: string
) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Register failed");
    }

    return response.json();
}