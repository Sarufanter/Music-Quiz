'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { registerShemaType } from '@/lib/registerSchema'

export default function SignUpClient() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit: SubmitHandler<registerShemaType> = (data) => {
    e.preventDefault()

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    })

    if (res.ok) {
      router.push('/sign-in')
    } else {
      const data = await res.json()
      setError(data.message || 'Помилка при реєстрації')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Реєстрація</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Ім’я користувача"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button className="w-full bg-green-600 text-white py-2 rounded">
          Зареєструватися
        </button>
      </form>
      <div className="text-center">
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          <Link href="/sign-in">Already have an account? Sign in</Link>
        </button>
      </div>
    </div>
  )
}
