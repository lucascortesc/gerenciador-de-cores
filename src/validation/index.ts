import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required("password is required")
    .min(8, "your password must contain at least 8 characters")
    .matches(/[a-z]/, "your password must contain at least one lowercase character")
    .matches(/[A-Z]/, "your password must contain at least one uppercase character")
    .matches(/[0-9]/, "your password must contain at least one number")
    .matches(/\W/, "your password must contain at least one special character")
    .matches(/^(?!.*\s).{0,}$/, "your password cannot contain spaces"),
});

export const RegisterSchema = yup.object().shape({
  name: yup.string().required("name is required").max(20, "name must contain a maximum of 20 characters"),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required("password is required")
    .min(8, "your password must contain at least 8 characters")
    .matches(/[a-z]/, "your password must contain at least one lowercase character")
    .matches(/[A-Z]/, "your password must contain at least one uppercase character")
    .matches(/[0-9]/, "your password must contain at least one number")
    .matches(/\W/, "your password must contain at least one special character")
    .matches(/^(?!.*\s).{0,}$/, "your password cannot contain spaces"),
  confirmPassword: yup
    .string()
    .required("confirm your password")
    .oneOf([yup.ref("password"), null], "password does not match"),
});

export const Step1Schema = yup.object().shape({
  name: yup.string().required("name is required").max(20, "name must contain a maximum of 20 characters"),
});

export const Step2Schema = yup.object().shape({
  name1: yup.string().required().max(20, "name must contain a maximum of 20 characters"),
  name2: yup.string().optional().max(20, "name must contain a maximum of 20 characters"),
  name3: yup.string().optional().max(20, "name must contain a maximum of 20 characters"),
  name4: yup.string().optional().max(20, "name must contain a maximum of 20 characters"),
  name5: yup.string().optional().max(20, "name must contain a maximum of 20 characters"),
  name6: yup.string().optional().max(20, "name must contain a maximum of 20 characters"),
  name7: yup.string().optional().max(20, "name must contain a maximum of 20 characters"),
  name8: yup.string().optional().max(20, "name must contain a maximum of 20 characters"),
  name9: yup.string().optional().max(20, "name must contain a maximum of 20 characters"),
  name10: yup.string().optional().max(20, "name must contain a maximum of 20 characters"),
});
