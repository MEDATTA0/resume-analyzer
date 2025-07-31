import Joi from "joi";

export const signUpValidator = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
    "any.required": "Please enter your email",
  }),
  password: Joi.string().required().label("password"),
  passwordConfirm: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.required": "Please confirm your password",
    "any.only": "Passwords must match",
  }),
})
  .required()
  .label("Signup credentials");

export const loginValidator = Joi.object({
  email: Joi.string()
    .required()
    .messages({ "any.required": "The email is required" }),
  password: Joi.string().min(8).max(20).required().messages({
    "string.min": "The password should have at least 8 characters",
    "string.max": "The password should have at most 20 characters",
    "any.required": "The password is required",
  }),
})
  .required()
  .label("Login credentials");
