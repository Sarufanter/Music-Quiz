// app/api/register/route.ts
import { z } from "zod"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import db from "@/lib/prisma"

const RegisterSchema = z.object({
  email: z.string().email({ message: "Невірний email" }),
  name: z.string().min(2, { message: "Ім'я закоротке" }),
  password: z.string().min(6, { message: "Пароль має бути не менше 6 символів" }),
})

export async function POST(req: Request) {
  const body = await req.json()

  const parsed = RegisterSchema.safeParse(body)
  if (!parsed.success) {
    const error = parsed.error.format()
    return NextResponse.json({ message: "Помилка валідації", error }, { status: 400 })
  }

  const { email, name, password } = parsed.data

  const userExists = await db.user.findUnique({ where: { email } })
  if (userExists) {
    return NextResponse.json({ message: "Користувач з таким email вже існує" }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  })

  return NextResponse.json({ message: "Користувача створено" }, { status: 201 })
}
