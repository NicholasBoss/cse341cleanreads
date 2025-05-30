
const { body, validationResult } = require('express-validator')
const validate = {}

validate.bookValidationRules = () => {
    // console.log('Validating book data');
    return [
        body('title')
        .notEmpty().withMessage('Title is required'),
        body('isbn10')// I'd like it to allow null values, but not empty strings
        .custom((value) => {
            if (value === '') {
                throw new Error('ISBN-10 is required');
            }
            return true;
        }),
        body('isbn13')
        .notEmpty().withMessage('ISBN-13 is required'),
        
        body('publication_date')
        .matches(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/).withMessage('Publication date must be in YYYY-MM-DD format')
        .isDate().withMessage('Invalid publication date')
        .custom((value) => {
            const today = new Date();
            const publicationDate = new Date(value);
            if (publicationDate > today) {
                throw new Error('Publication date cannot be in the future');
            }
            return true;
        }),
        body('description')
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 200 }).withMessage('Description must be less than 200 characters'),
        body('age_range')
        .notEmpty().withMessage('Age range is required')
        .matches(/^\d+-\d+$||18+\d*$/).withMessage('Age range must be in the format "min-max"'),
        body('publisher')
        .notEmpty().withMessage('Publisher is required')
        .isMongoId().withMessage('Invalid Publisher ID')
    ]
}

validate.validateBook = () => {
    return [
        ...validate.bookValidationRules(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ];
};

validate.publisherValidationRules = () => {
    // console.log('Validating publisher data');
    return [
        body('publisher_name')
        .notEmpty().withMessage('Publisher name is required'),
        body('publisher_location')
        .notEmpty().withMessage('Publisher location is required')
    ];
}

validate.validatePublisher = () => {
    return [
        ...validate.publisherValidationRules(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ];
};

module.exports = validate;