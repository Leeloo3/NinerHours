const { body, validationResult } = require('express-validator');

exports.validateId = (req, res, next)=>{
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};

exports.validateSignUp = [body('fistName', 'First name cannot not be empty').notEmpty().trim().escape(),
    body('LastName', 'Last name cannot not be empty').notEmpty().trim().escape(),
    body('email', 'Email must be a valit email address').isEmail().trim().normalizeEmail(),
    body('password', 'Password must be at least 8 characters and at most 64 characters').isLength({min: 8, max: 64})]

exports.validateLogin = [body('email', 'Email must be a valit email address').isEmail().trim().normalizeEmail(),
    body('password', 'Password must be at least 8 characters and at most 64 characters').isLength({min: 8, max: 64})],

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(err=>{
            req.flash('error', err.msg);
        })
        return res.redirect('back');
    } else {
        return next();
    }
} 

exports.validateStory = [
    // Validate and sanitize title
    body('title')
        .trim()
        .isLength({ min: 1 }).withMessage('Title cannot be empty.')
        .escape(), // Escape to prevent XSS

    // Validate and sanitize content
    body('content')
        .trim()
        .isLength({ min: 10 }).withMessage('Content must be at least 10 characters long.')
        .escape(), // Escape to prevent XSS

    // Middleware to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('error', errors.array().map(err => err.msg));
            return res.redirect('back'); // Redirect back to the previous page
        }
        next(); 
    }
];
