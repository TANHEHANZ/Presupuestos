import { z } from "zod";
const navigationItem = z.object({
  label: z.string(),
  icon: z.string(),
  path: z.string(),
});
const navigationGroup = z.object({
  title: z.string(),
  items: z.array(navigationItem),
});

const user = z.object({
  name: z.string(),
  rol: z.string(),
  unidad: z.string(),
});
export const MeResponse = z.object({
  _n: z.array(navigationGroup),
  _p: z.array(z.string()),
  _u: user,
});
export type DTO_MeResponse = z.infer<typeof MeResponse>;
