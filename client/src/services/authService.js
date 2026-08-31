const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

async function apiFetch(endpoint, { method = 'GET', body } = {}, token) {
    const response = await fetch(
        `${API_URL}${endpoint}`, 
        {
            method,
            headers: {
                ...((body !== undefined )&& { "Content-Type": "application/json" }),
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
    const payload = new FormData()
    if (data.profilePhoto instanceof File) {
        payload.append("profilePhoto", data.profilePhoto)
    }
    payload.append("name", data.name)
    payload.append("surname", data.surname)

    const response = await fetch(
        `${API_URL}/auth/me`,
        {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: payload
        }
    )

    const result = await response.json()

    if (!response.ok) {
        throw result
    }

    return result.data
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

export async function requestDeleteAccount(token) {
    return apiFetch(
        "/auth/request-delete-account",
        { method: 'POST' },
        token
    )
}

export async function confirmDeleteAccount(token, deleteAcccountToken) {
    return apiFetch(
        `/auth/confirm-delete-account?token=${deleteAcccountToken}`,
        { method: 'DELETE' },
        token
    )
}

export async function verifyDeleteAccountToken(deleteAccountToken) {
    return apiFetch(
        `/auth/confirm-delete-account/verify-token?token=${deleteAccountToken}`
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