import Joi from "joi";

export const userCheckSchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({ "any.required": "Missing required email field" })
    .email(),
  password: Joi.string()
    .required()
    .messages({ "any.required": "Missing required password field" })
    .min(8),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

export const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      "any.required": "Subscription is required",
    }),
});
