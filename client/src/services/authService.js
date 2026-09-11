const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

async function apiFetch(endpoint, { method = 'GET', body } = {}, isRetry) {
    const isFormData = body instanceof FormData

    const response = await fetch(
        `${API_URL}${endpoint}`, 
        {
            method,
            headers: {
                ...(body !== undefined && !isFormData && { "Content-Type": "application/json" }),
            },
            credentials: "include",
            ...(body !== undefined && { body: isFormData ? body : JSON.stringify(body) })
        }
    )

    const result = await response.json()

    if (!response.ok) {
        if (isRetry) {
            throw result
        }

        if (response.status === 401) {
            const response = await fetch(
                `${API_URL}/auth/refresh`, 
                { 
                    method: "POST",
                    credentials: "include" 
                }
            )

            if (!response.ok) {
                const result = await response.json()
                throw result
            }

            return apiFetch(endpoint, { method: 'POST', body }, true)
        }

        throw result
    }
    
    return result.data
}

export async function getUser() {
    return apiFetch(
        "/auth/me", 
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

export async function googleAuth(access_token) {
    return apiFetch(
        "/auth/google",
        { method: 'POST', body: { access_token: access_token } }
    )
}

export async function updateProfilePhoto(file) {
    const formData = new FormData()
    formData.append("profilePhoto", file)

    return apiFetch(
        "/auth/me/profile-photo",
        { method: 'PATCH', body: formData },
    )
}

export async function updateProfile(data) {
    return apiFetch(
        "/auth/me",
        { method: 'PATCH', body: data },
    )
}

export async function updateEmail(data) {
    return apiFetch(
        "/auth/me/email", 
        { method: 'PATCH', body: data }, 
    )
}

export async function updatePassword(data) {
    return apiFetch(
        "/auth/me/password", 
        { method: 'PATCH', body: data }, 
    )
}

export async function requestDeleteAccount() {
    return apiFetch(
        "/auth/request-delete-account",
        { method: 'POST' },
    )
}

export async function confirmDeleteAccount(deleteAcccountToken) {
    return apiFetch(
        `/auth/confirm-delete-account?token=${deleteAcccountToken}`,
        { method: 'DELETE' },
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

export async function logout() {
    return apiFetch(
        "/auth/logout",
        { method: 'POST' }
    )
}