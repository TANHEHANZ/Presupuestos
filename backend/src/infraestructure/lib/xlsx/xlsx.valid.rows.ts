import { z } from "zod";

export function validateRows<T>(
  rows: Array<Record<string, any>>,
  schema: z.ZodSchema<T>
): { valid: Array<T>; errors: Array<{ row: number; error: z.ZodError<T> }> } {
  const valid: Array<T> = [];
  const errors: Array<{ row: number; error: z.ZodError<T> }> = [];

  rows.forEach((row, index) => {
    const result = schema.safeParse(row);
    if (result.success) {
      valid.push(result.data);
    } else {
      errors.push({ row: index + 2, error: result.error });
    }
  });

  return { valid, errors };
}
