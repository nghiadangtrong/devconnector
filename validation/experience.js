const Validate = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput (data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if(Validate.isEmpty(data.title)) {
        errors.title = 'Job title field is required';
    }

    if(Validate.isEmpty(data.company)) {
        errors.comapny = "Company field is required";
    }

    if(Validate.isEmpty(data.from)) {
        errors.from = "Company field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}