import * as yup from "yup";

export const createPaletteSchema = yup
  .object()
  .shape({
    name: yup.string().required("name is required").max(120, "name must contain less than 121 characters"),
    colors: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            name: yup
              .string()
              .required("color name is required")
              .max(32, "color name must contain less than 33 characters"),
            rgba: yup.string().required("color rgba is required"),
            hex: yup
              .string()
              .required("color hex is required")
              .min(1, "color hex must contain at least 1 characters")
              .max(7, "color hex must contain less than 8 characters"),
          })
          .noUnknown(true)
      )
      .required()
      .min(2, "you must add at least 2 colors"),
  })
  .noUnknown(true);

export const updatePaletteSchema = yup
  .object()
  .shape({
    name: yup.string().max(120, "name must contain less than 121 characters"),
    colors: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            name: yup
              .string()
              .required("color name is required")
              .max(32, "color name must contain less than 33 characters"),
            rgba: yup.string().required("color rgba is required"),
            hex: yup
              .string()
              .required("color hex is required")
              .min(1, "color hex must contain at least 1 characters")
              .max(7, "color hex must contain less than 8 characters"),
          })
          .noUnknown(true)
      )
      .min(2, "you must add at least 2 colors"),
  })
  .noUnknown(true);
