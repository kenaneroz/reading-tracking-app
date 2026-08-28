const API_URL = import.meta.env.API_URL || "http://localhost:3000"

async function apiFetch(endpoint, { method = 'GET', body } = {}, token) {
    const response = await fetch(
        `${API_URL}${endpoint}`, 
        {
            method,
            headers: {
                ...(body !== undefined && { "Content-Type": "application/json" }),
                ...(token && { Authorization: `Bearer ${token}` })
            },
            ...(body !== undefined && { body: JSON.stringify(body) })
        }
    )

    const result = await response.json()

    if (!response.ok) {
        throw result
    }

    return result.data
}

export async function getUser(token) {
    return apiFetch(
        "/auth/me", 
        {}, 
        token
    )
}

export async function register(data) {
    return apiFetch(
        "/auth/register", 
        { method: 'POST', body: data }
    )
}

export async function login(data) {
    return apiFetch(
        "/auth/login", 
        { method: 'POST', body: data }
    )
}

export async function updateProfile(token, data) {
    return apiFetch(
        "/auth/me", 
        { method: 'PATCH', body: data }, 
        token
    )
}

export async function updateEmail(token, data) {
    return apiFetch(
        "/auth/me/email", 
        { method: 'PATCH', body: data }, 
        token
    )
}

export async function updatePassword(token, data) {
    return apiFetch(
        "/auth/me/password", 
        { method: 'PATCH', body: data }, 
        token
    )
}

export async function deleteUser(token) {
    return apiFetch(
        "/auth/me", 
        { method: 'DELETE' }, 
        token
    )
}

export async function forgotPassword(data) {
    return apiFetch(
        "/auth/forgot-password", 
        { method: 'POST', body: data }
    )
}

export async function resetPassword(resetPasswordToken, data) {
    return apiFetch(
        `/auth/reset-password?token=${resetPasswordToken}`, 
        { method: 'PATCH', body: data }
    )
}

export async function verifyResetToken(resetPasswordToken) {
    return apiFetch(
        `/auth/reset-password/verify-token?token=${resetPasswordToken}`
    )
}