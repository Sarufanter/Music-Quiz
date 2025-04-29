import { z } from "zod";

const registerShema = z.object({
    email: z.string().email({ message: "Невірний email" }),
    username: z.string().min(3, { message: "Ім'я закоротке" }),
    password: z.string().min(6, { message: "Пароль має бути не менше 6 символів" }),
})

export {registerShema}