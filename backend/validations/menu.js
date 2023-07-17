const validateMenu = (req,image) => {
    const { name, price, description, categoryId} = req.body;
    const errors = [];

    if (!name) {
        errors.push('Name is required');
    }
    else if(typeof name !== 'string')
    {
        errors.push('Name should be a string');
    }
    if (!price) {
        errors.push('Price is required');
    }
    if (!description) {
        errors.push('Description is required');
    }
    else if(typeof description !== 'string')
    {
        errors.push('Description should be a string');
    }
    if (!categoryId) {
        errors.push('categoryId is required');
    }
    if (!image) {
        errors.push('Image is required');
    }
    return errors;

}

module.exports = {validateMenu};