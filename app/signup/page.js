'use client'
import { useState } from 'react'
import { createClient } from '../../lib/supabaseClient'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSignup(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setError(error.message)
    else setDone(true)
    setLoading(false)
  }

  if (done) {
    return (
      <div className="max-w-sm mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-serif font-bold mb-4">You're in 💛</h1>
        <p className="text-ink/70">Check your email to confirm your account, then log in to begin your 5-day free trial.</p>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-20">
      <h1 className="text-2xl font-serif font-bold mb-2 text-center">Begin your healing</h1>
      <p className="text-center text-sm text-ink/60 mb-6">5 days free. Then R300/month.</p>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg border border-gold/30" required
        />
        <input
          type="password" placeholder="Create a password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg border border-gold/30" required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" disabled={loading} className="btn-gold w-full">
          {loading ? 'Creating account...' : 'Start Free Trial'}
        </button>
      </form>
      <p className="text-sm text-center mt-4 text-ink/60">
        Already have an account? <a href="/login" className="text-gold font-medium">Log in</a>
      </p>
    </div>
  )
}
