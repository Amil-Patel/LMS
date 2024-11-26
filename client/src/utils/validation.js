export const validationEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const validationName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces
    return nameRegex.test(name) && name.trim().length >= 2;
}

export const validationPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
}

export const validationDate = (date) => {
    // Date in YYYY-MM-DD format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) return false;

    const [year, month, day] = date.split('-').map(Number);
    const parsedDate = new Date(year, month - 1, day);
    return parsedDate && parsedDate.getMonth() + 1 === month && parsedDate.getDate() === day;
}

// Optional: Other validations for specific fields
export const validationUsername = (username) => {
    const usernameRegex = /^[A-Za-z0-9_]{3,20}$/; // Allows letters, numbers, underscores, 3-20 characters
    return usernameRegex.test(username);
}

export const validationPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Basic E.164 format
    return phoneRegex.test(phoneNumber);
}