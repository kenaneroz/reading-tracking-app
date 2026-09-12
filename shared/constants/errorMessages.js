// ─── Generic / System ────────────────────────────────────────────────────────

export const ERRORS = {
    VALIDATION_FAILED: "Validation failed",
    NO_FIELDS: "No fields to update",
    INVALID_FIELDS: "Invalid fields in request",
    INVALID_ID: "Invalid ID",
    INVALID_DATA: "Invalid data entry",
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const AUTH_ERRORS = {
    USER_NOT_FOUND: "User not found",
    UNAUTHORIZED: "Unauthorized",
    INVALID_CREDENTIALS: "Invalid email or password",
    EMAIL_IN_USE: "This email address is already in use",
    EMAIL_SAME: "This is already your current email address",
    INVALID_GOOGLE_TOKEN: "Invalid Google token",
    WRONG_CURRENT_PASSWORD: "Current password is incorrect",
    SAME_PASSWORD: "New password must be different from the current password",
    PASSWORDS_NO_MATCH: "Passwords do not match",
    INVALID_OR_EXPIRED_TOKEN: "Invalid or expired token",
    INVALID_OR_EXPIRED_REFRESH: "Invalid or expired refresh token",
    INVALID_OR_EXPIRED_LINK:        "Invalid or expired link",
}

// ─── Books ────────────────────────────────────────────────────────────────────

export const BOOK_ERRORS = {
    NOT_FOUND:              "Book not found",
    ALREADY_IN_LIBRARY:     "This book is already in your library",
    PAGE_EXCEEDS_TOTAL:     "Current page cannot exceed total pages",
    PAGE_BELOW_PREVIOUS:    "Current page cannot be less than the previous page",
}

// ─── Notes ───────────────────────────────────────────────────────────────────

export const NOTE_ERRORS = {
    NOT_FOUND:          "Note not found",
    PAGE_EXCEEDS_TOTAL: "Page cannot exceed total pages",
}

// ─── Reading Activity ─────────────────────────────────────────────────────────

export const READING_ACTIVITY_ERRORS = {
    NOT_FOUND: "Reading activity not found",
}

// ─── File Upload ──────────────────────────────────────────────────────────────

export const FILE_ERRORS = {
    SIZE_EXCEEDED:  "File size cannot exceed 5MB",
    INVALID_FORMAT: "Only JPEG, PNG, and WEBP formats are allowed",
}

// ─── Field: Name ──────────────────────────────────────────────────────────────

export const NAME_ERRORS = {
    REQUIRED:       "Name is required",
    TOO_SHORT:      "Name must be at least 2 characters long",
    TOO_LONG:       "Name cannot be longer than 50 characters",
    LETTERS_ONLY:   "Name must consist only of letters",
}

// ─── Field: Surname ───────────────────────────────────────────────────────────

export const SURNAME_ERRORS = {
    REQUIRED:       "Surname is required",
    TOO_SHORT:      "Surname must be at least 2 characters long",
    TOO_LONG:       "Surname cannot be longer than 50 characters",
    LETTERS_ONLY:   "Surname must consist only of letters",
}

// ─── Field: Email ─────────────────────────────────────────────────────────────

export const EMAIL_ERRORS = {
    REQUIRED:   "Email is required",
    TOO_LONG:   "Email cannot be longer than 254 characters",
    INVALID:    "Invalid email address",
}

// ─── Field: Password ─────────────────────────────────────────────────────────

export const PASSWORD_ERRORS = {
    REQUIRED:           "Password is required",
    TOO_SHORT:          "Password must be at least 8 characters long",
    TOO_LONG:           "Password cannot be longer than 128 characters",
    NO_UPPERCASE:       "Password must contain at least one uppercase letter",
    NO_LOWERCASE:       "Password must contain at least one lowercase letter",
    NO_NUMBER:          "Password must contain at least one number",
    NO_SPECIAL:         "Password must contain at least one special character",
    NEW_REQUIRED:       "New password is required",
    NEW_TOO_SHORT:      "New password must be at least 8 characters long",
    NEW_TOO_LONG:       "New password cannot be longer than 128 characters",
    NEW_NO_UPPERCASE:   "New password must contain at least one uppercase letter",
    NEW_NO_LOWERCASE:   "New password must contain at least one lowercase letter",
    NEW_NO_NUMBER:      "New password must contain at least one number",
    NEW_NO_SPECIAL:     "New password must contain at least one special character",
    CONFIRM_REQUIRED:   "Confirm new password is required",
    CURRENT_REQUIRED:   "Current password is required",
}

// ─── Field: Title ─────────────────────────────────────────────────────────────

export const TITLE_ERRORS = {
    REQUIRED:   "Title is required",
    NOT_STRING: "Title must be a text value",
}

// ─── Field: Author ────────────────────────────────────────────────────────────

export const AUTHOR_ERRORS = {
    REQUIRED:   "Author is required",
    NOT_STRING: "Author must be a text value",
}

// ─── Field: Genre ─────────────────────────────────────────────────────────────

export const GENRE_ERRORS = {
    REQUIRED:   "Genre is required",
    NOT_STRING: "Genre must be a text value",
    INVALID:    "Invalid genre",
}

// ─── Field: Format ────────────────────────────────────────────────────────────

export const FORMAT_ERRORS = {
    REQUIRED:   "Format is required",
    NOT_STRING: "Format must be a text value",
    INVALID:    "Invalid format",
}

// ─── Field: Rating ────────────────────────────────────────────────────────────

export const RATING_ERRORS = {
    INVALID: "Invalid rating",
}

// ─── Field: Total Pages ───────────────────────────────────────────────────────

export const TOTAL_PAGES_ERRORS = {
    INVALID: "Total pages must be a valid number",
    TOO_LOW: "Total pages must be at least 1",
}

// ─── Field: Current Page ─────────────────────────────────────────────────────

export const CURRENT_PAGE_ERRORS = {
    INVALID:    "Current page must be a valid number",
    NEGATIVE:   "Current page cannot be negative",
}

// ─── Field: Page (Note) ───────────────────────────────────────────────────────

export const PAGE_ERRORS = {
    INVALID: "Page must be a valid number",
    TOO_LOW: "Page must be at least 1",
}

// ─── Field: Note Content ─────────────────────────────────────────────────────

export const NOTE_CONTENT_ERRORS = {
    REQUIRED:   "Note content is required",
    NOT_STRING: "Note content must be a text value",
}
