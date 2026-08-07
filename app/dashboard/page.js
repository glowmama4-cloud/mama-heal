const affirmations = [
  "I am allowed to put myself first without guilt.",
  "My healing does not have to be pretty to be real.",
  "I deserve a love that chooses me daily, not just when it's convenient.",
  "My children growing up does not mean I disappear — I am still becoming.",
  "I release what I cannot control, and I nurture what I can.",
]

export default function Dashboard() {
  const today = new Date().getDate()
  const affirmation = affirmations[today % affirmations.length]

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-serif font-bold mb-1">Good to see you 💛</h1>
      <p className="text-ink/60 mb-8">Day {today % 5 + 1} of your journey</p>

      <div className="card bg-ink text-white mb-8">
        <p className="text-xs uppercase tracking-wide text-gold mb-2">Today's Affirmation</p>
        <p className="text-xl font-serif">{affirmation}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <a href="/journal" className="card hover:shadow-md transition">
          <h3 className="font-semibold mb-1">📓 Write in your journal</h3>
          <p className="text-sm text-ink/70">Reflect on today's prompt.</p>
        </a>
        <a href="/library" className="card hover:shadow-md transition">
          <h3 className="font-semibold mb-1">💛 Continue healing sessions</h3>
          <p className="text-sm text-ink/70">Self-love, breakup, or relationship focus.</p>
        </a>
      </div>
    </div>
  )
}
