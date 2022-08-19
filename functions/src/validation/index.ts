import * as yup from "yup";

export const createUserSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required("name is required")
      .min(3, "name must contain at least 3 characters")
      .max(120, "name must contain less than 120 characters"),
    email: yup.string().email("e-mail format is invalid").required("e-mail is required"),
    password: yup
      .string()
      .required("password is required")
      .min(8, "your password must contain at least 8 characters")
      .matches(/[a-z]/, "your password must contain at least one lowercase character")
      .matches(/[A-Z]/, "your password must contain at least one uppercase character")
      .matches(/[0-9]/, "your password must contain at least one number")
      .matches(/\W/, "your password must contain at least one special character")
      .matches(/^(?!.*\s).{0,}$/, "your password cannot contain spaces"),
  })
  .noUnknown(true);

export const loginSchema = yup
  .object()
  .shape({
    email: yup.string().email("e-mail format is invalid").required("e-mail is required"),
    password: yup
      .string()
      .required("password is required")
      .min(8, "your password must contain at least 8 characters")
      .matches(/[a-z]/, "your password must contain at least one lowercase character")
      .matches(/[A-Z]/, "your password must contain at least one uppercase character")
      .matches(/[0-9]/, "your password must contain at least one number")
      .matches(/\W/, "your password must contain at least one special character")
      .matches(/^(?!.*\s).{0,}$/, "your password cannot contain spaces"),
  })
  .noUnknown(true);
