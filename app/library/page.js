const sessions = {
  'Self-Love': [
    { title: 'Coming Home to Yourself', desc: 'A grounding practice for rebuilding self-worth.' },
    { title: 'You Are Not Behind', desc: 'Releasing comparison and impatience with your own timeline.' },
    { title: 'Filling Your Own Cup First', desc: 'Why self-care is not selfish — it\'s survival.' },
  ],
  'Breakup Healing': [
    { title: 'Grieving What\'s Gone', desc: 'Giving yourself permission to mourn the relationship.' },
    { title: 'Releasing the Story You Told Yourself', desc: 'Untangling blame, shame, and "what ifs".' },
    { title: 'Rebuilding After Heartbreak', desc: 'Practical steps to feel like yourself again.' },
  ],
  'Relationship & Partner Focus': [
    { title: 'Your Children Will Leave — Your Partner Stays', desc: 'Rebalancing attention between motherhood and partnership.' },
    { title: 'Rekindling Intimacy', desc: 'Small daily habits to keep the spark alive.' },
    { title: 'Speaking Your Needs Without Guilt', desc: 'Healthy communication in long-term relationships.' },
  ],
}

export default function Library() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-serif font-bold mb-2">Healing Library</h1>
      <p className="text-ink/70 mb-10">Sessions to guide you back to yourself — and closer to the people you love.</p>

      {Object.entries(sessions).map(([category, items]) => (
        <div key={category} className="mb-12">
          <h2 className="text-xl font-serif font-bold text-gold mb-4">{category}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {items.map((s) => (
              <div key={s.title} className="card">
                <h3 className="font-semibold mb-1">{s.title}</h3>
                <p className="text-sm text-ink/70">{s.desc}</p>
                <button className="mt-4 text-sm font-semibold text-gold hover:underline">
                  Begin session →
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
