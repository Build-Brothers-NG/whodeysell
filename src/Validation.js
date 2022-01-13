import Joi from "joi";

export const ValidateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};

export const ValidateReg = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().min(8).required(),
    confirm_password: Joi.string().min(8).required().valid(Joi.ref("password")),
  });

  return schema.validate(data);
};

export const ValidateItem = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    amount: Joi.string().required(),
    location: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    description: Joi.string().min(5).required(),
    qty: Joi.string().required(),
    unit: Joi.string().required(),
    category: Joi.string().required(),
    photo: Joi.any(),
  });
  return schema.validate(data);
};

export const ValidateSwapItem = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    amount: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    description: Joi.string().min(5).required(),
    phone: Joi.string().required(),
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    categories: Joi.array().min(1).required(),
    photo: Joi.any(),
  });
  return schema.validate(data);
};
