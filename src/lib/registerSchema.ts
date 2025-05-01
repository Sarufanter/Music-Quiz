import { z } from "zod";

export const registerShema = z.object({
    email: z.string().email({ message: "Невірний email" }),
    username: z.string().min(3, { message: "Ім'я закоротке" }).max(30, {message: "Ім'я занадто довге"}),
    password: z.string().min(6, { message: "Пароль має бути не менше 6 символів" }),
    confirmPassword: z.string()
}).refine(
    (val) => {return val.password === val.confirmPassword},
    {
        message: 'Пароль не співпадає',
        path: ['confirmPassword']
    }
)

export type registerShemaType = z.infer<typeof registerShema>