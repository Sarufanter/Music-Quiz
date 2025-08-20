import { z } from "zod";

export const presetShcema = z.object({
  title: z
    .string()
    .min(5, { message: "Закороткий" })
    .max(30, { message: "Задовгий заголовок" }),
  description: z
    .string()
    .min(20, { message: "Дайте довший опис" })
    .max(100, { message: "Занадто довгий опис" }),
  // songs: z
  //   .array(z.string().url(), { required_error: "Завантажте пісні" })
  //   .min(1, { message: "Мінімум одна пісня" }),
});

export type presetShcemaType = z.infer<typeof presetShcema>;
