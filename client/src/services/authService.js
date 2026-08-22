const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export async function getUser(token) {
    const response = await fetch(
        `${API_URL}/auth/me`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
    )

    const result = await response.json()

    if (!response.ok) {
        throw result
    }

    return result.data
}

export async function register(data) {
    const response = await fetch(
        `${API_URL}/auth/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    )

    const result = await response.json()

    if (!response.ok) {
        throw result
    }

    return result.data
}

export async function login(data) {
    const response = await fetch(
        `${API_URL}/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    )

    const result = await response.json()

    if (!response.ok) {
        throw result
    }

    return result.data
}

export async function deleteUser(token) {
    const response = await fetch(
        `${API_URL}/auth/me`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
    )

    const result = await response.json()

    if (!response.ok) {
        throw result
    }

    return result.data
}