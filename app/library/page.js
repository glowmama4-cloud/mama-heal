import { sessions } from '../../lib/sessions'

const categories = ['Self-Love', 'Breakup Healing', 'Relationship & Partner Focus']

export default function Library() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-serif font-bold mb-2">Healing Library</h1>
      <p className="text-ink/70 mb-10">Sessions to guide you back to yourself — and closer to the people you love.</p>

      {categories.map((category) => (
        <div key={category} className="mb-12">
          <h2 className="text-xl font-serif font-bold text-gold mb-4">{category}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(sessions)
              .filter(([, s]) => s.category === category)
              .map(([slug, s]) => (
                <div key={slug} className="card">
                  <h3 className="font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-ink/70">{s.intro.slice(0, 90)}...</p>
                  <a
                    href={`/library/${slug}`}
                    className="mt-4 inline-block text-sm font-semibold text-gold hover:underline"
                  >
                    Begin session →
                  </a>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
