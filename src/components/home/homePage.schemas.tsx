import * as yup from 'yup';

export const addFriendSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required')
}).required();