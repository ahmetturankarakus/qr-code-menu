const validateCompany = (req) => {
    const { name, address, city, phone, userId ,tables} = req.body;
    const errors = [];

    if (!name) {
        errors.push('Name is required');
    }
    else if (typeof name !== 'string') {
        errors.push('Name should be a string');
    }
    if(!tables)
    {
        errors.push('tables is required');
    }
    else if(typeof tables !== 'number'){
        errors.push('tables should be a number');
    }
    if (!address) {
        errors.push('Address is required');
    }
    else if (typeof address !== 'string') {
        errors.push('Address should be a string');
    }
    if (!userId) {
        errors.push('User Id is required');
    }
    else if (typeof userId !== 'number') {
        errors.push('User Id should be a number');
    }
    if (!city) {
        errors.push('city is required');
    }
    else if (typeof city !== 'string') {
        errors.push('city should be a string');
    }
    if (!phone) {
        errors.push('Phone is required');
    }

    if (phone) {
        const phoneString = phone.toString();
        if (phoneString.length < 10) {
            errors.push('Phone number should be 10 digits');
        }
        else if (!/^\d+$/.test(phoneString)) {
            errors.push('Phone number should contain only digits');
        }
    }

    return errors;
};

module.exports = { validateCompany };