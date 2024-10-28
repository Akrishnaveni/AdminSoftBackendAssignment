import * as yup from 'yup';

export const userSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export const contactSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string(),
  address: yup.string(),
  timezone: yup.string().required(),
});
