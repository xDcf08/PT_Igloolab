import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodObject } from 'zod';

export const validate = (schema: ZodObject<any>) => 
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      console.log(req.body)
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Error de validación de datos.",
          errors: error.issues.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
      }

      // Error inesperado
      console.error("Error inesperado en validación:", error);
      return res.status(500).json({
        message: "Error interno del servidor durante la validación.",
      });
    }
  };
