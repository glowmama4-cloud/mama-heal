export default function Pricing() {
  return (
    <div className="max-w-xl mx-auto px-6 py-16 text-center">
      <h1 className="text-3xl font-serif font-bold mb-4">One space. One price.</h1>
      <div className="card mt-8">
        <p className="text-ink/60 text-sm mb-1">5 days free, then</p>
        <p className="text-4xl font-serif font-bold text-gold">R300<span className="text-lg text-ink/60">/month</span></p>
        <ul className="mt-6 text-left text-sm text-ink/70 space-y-2">
          <li>✔ Full Healing Library (Self-Love, Breakup, Relationship)</li>
          <li>✔ Daily affirmations & journaling</li>
          <li>✔ Cancel anytime</li>
        </ul>
        <button
          className="btn-gold w-full mt-6"
          disabled
          title="PayFast merchant account not yet connected"
        >
          Start Free Trial (PayFast setup pending)
        </button>
        <p className="text-xs text-ink/40 mt-3">
          Payments open once your PayFast merchant account is approved.
        </p>
      </div>
    </div>
  )
}
