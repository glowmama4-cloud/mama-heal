import { sessions } from '../../../lib/sessions'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return Object.keys(sessions).map((slug) => ({ slug }))
}

export default function SessionPage({ params }) {
  const session = sessions[params.slug]

  if (!session) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <a href="/library" className="text-sm text-gold hover:underline">← Back to Healing Library</a>

      <p className="text-xs uppercase tracking-wide text-gold font-semibold mt-6 mb-2">
        {session.category}
      </p>
      <h1 className="text-3xl font-serif font-bold mb-8">{session.title}</h1>

      <div className="space-y-6 text-ink/80 leading-relaxed">
        <p>{session.intro}</p>

        {session.body.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}

        <div className="card bg-blush">
          <h3 className="font-semibold mb-2">Today, try this:</h3>
          {session.tryToday.split('\n\n').map((para, i) => (
            <p key={i} className="mb-2 last:mb-0">{para}</p>
          ))}
        </div>

        <div className="card">
          <h3 className="font-semibold mb-2">A small step:</h3>
          <p>{session.smallStep}</p>
        </div>

        {session.closing && (
          <p className="font-serif text-lg italic text-center py-4">{session.closing}</p>
        )}

        <div className="card bg-ink text-white">
          <p className="text-xs uppercase tracking-wide text-gold mb-2">Journal Prompt</p>
          <p className="font-serif text-lg mb-4">{session.journalPrompt}</p>
          <a href="/journal" className="btn-gold inline-block">Write about it →</a>
        </div>
      </div>
    </div>
  )
}
