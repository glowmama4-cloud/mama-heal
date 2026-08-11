'use client'
import { useState, useEffect } from 'react'
import { createClient } from '../../lib/supabaseClient'

export default function Pricing() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  async function handleCheckout() {
    if (!user) {
      window.location.href = '/signup'
      return
    }
    setLoading(true)
    const res = await fetch('/api/payfast/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, email: user.email }),
    })
    const html = await res.text()
    const newDoc = document.open()
    newDoc.write(html)
    newDoc.close()
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-16 text-center">
      <h1 className="text-3xl font-serif font-bold mb-4">One space. One price.</h1>
      <div className="card mt-8">
        <p className="text-ink/60 text-sm mb-1">5 days free, then</p>
        <p className="text-4xl font-serif font-bold text-gold">R150<span className="text-lg text-ink/60">/month</span></p>
        <ul className="mt-6 text-left text-sm text-ink/70 space-y-2">
          <li>✓ Full Healing Library (Self-Love, Breakup, Relationship)</li>
          <li>✓ Daily affirmations & journaling</li>
          <li>✓ Cancel anytime</li>
        </ul>
        <button
          className="btn-gold w-full mt-6"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? 'Redirecting to PayFast...' : user ? 'Start Free Trial' : 'Sign Up to Start'}
        </button>
        <p className="text-xs text-ink/40 mt-3">
          Secure payment powered by PayFast.
        </p>
      </div>
    </div>
  )
}
