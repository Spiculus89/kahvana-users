import { body } from 'express-validator';

export const validateUserData = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('phoneNumber').isMobilePhone('any').withMessage('Invalid phone number'), // Use 'any' as the locale
  ];
  