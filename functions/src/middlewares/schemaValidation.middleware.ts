import { NextFunction, Request, Response } from "express";
import { ObjectSchema, ValidationError } from "yup";
import { AppError } from "../errors/AppError";

export const schemaValidation =
  (schema: ObjectSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validation = await schema.validate(req.body);

      let invalidFields = [];

      for (let i in req.body) {
        if (!Object.keys(validation).some((key) => key === i)) {
          invalidFields.push(i);
        }
      }

      if (invalidFields.length > 0) {
        throw new ValidationError(
          invalidFields.length > 1
            ? `(${invalidFields.join(", ")}) are invalids fields`
            : `(${invalidFields[0]}) is an invalid field`
        );
      }

      next();
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = error.errors.join(", ");

        throw new AppError(errors);
      }
    }
  };
