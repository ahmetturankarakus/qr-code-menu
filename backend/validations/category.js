const validateCategory = (req) => {
    const { name, companyName } = req.body;
    const errors = [];

    if (!name) {
        errors.push('Name is required');
    }
    else if(typeof name !== 'string')
    {
        errors.push('Name should be a string');
    }
    if (!companyName) {
        errors.push('companyName is required');
    }
    else if(typeof companyName !== 'string')
    {
        errors.push('companyName should be a string');
    }
    return errors;

}

module.exports = {validateCategory};