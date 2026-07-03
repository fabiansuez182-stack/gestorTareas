export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).{8,}$/

export const validateEmail = (email) => EMAIL_REGEX.test(email)

export const validatePassword = (password) => PASSWORD_REGEX.test(password)

export const validateTaskName = (name) => !!(name && name.trim().length > 0)
