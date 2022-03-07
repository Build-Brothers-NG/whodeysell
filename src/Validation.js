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
    id: Joi.any(),
    email: Joi.any(),
    name: Joi.string().required(),
    amount: Joi.any().required(),
    location: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.any(),
    otherCity: Joi.any(),
    description: Joi.string().min(5).required(),
    qty: Joi.any().required(),
    unit: Joi.string().required(),
    category: Joi.string().required(),
    photo: Joi.any(),
  });
  return schema.validate(data);
};

export const ValidateItemUpdate = (data) => {
  const schema = Joi.object({
    itemName: Joi.string().required(),
    item_price: Joi.any().required(),
    purchase_location: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.any(),
    otherCity: Joi.any(),
    item_description: Joi.string().min(5).required(),
    item_quantity: Joi.any().required(),
    q_unit: Joi.string().required(),
    category: Joi.string().required(),
    category: Joi.string().required(),
    id: Joi.any(),
    name: Joi.any(),
    userId: Joi.any(),
    hasVoted: Joi.any(),
    created_at: Joi.any(),
    kudos: Joi.any(),
    votes: Joi.any(),
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
