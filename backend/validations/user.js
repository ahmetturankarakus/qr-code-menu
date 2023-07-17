const validateUser = (req) => {
    const { name, email, password } = req.body;
    const errors = [];

    if (!name) {
        errors.push('Name is required');
    } else if (typeof name !== 'string') {
        errors.push('Name should be a string');
    }
    if (!email) {
        errors.push('Email is required');
    } else if (typeof email !== 'string') {
        errors.push('Email should be a string');
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        errors.push('Email is not valid');
    }

    if (!password) {
        errors.push('Password is required');
    }
    return errors;
}

module.exports = {validateUser};
