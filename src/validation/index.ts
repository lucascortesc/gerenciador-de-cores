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
