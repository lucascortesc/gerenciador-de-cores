import * as yup from "yup";

export const createPaletteSchema = yup
  .object()
  .shape({
    name: yup.string().required("name is required").max(120, "name must contain less than 121 characters"),
    colors: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required("name is required").max(32, "name must contain less than 33 characters"),
          rgba: yup.string().required("rgba is required"),
          hex: yup
            .string()
            .required("hex is required")
            .min(1, "hex must contain at least 1 characters")
            .max(6, "hex must contain less than 7 characters"),
        })
      )
      .required(),
  })
  .noUnknown(true);
