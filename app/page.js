export default function Home() {
  return (
    <div>
      <section className="max-w-4xl mx-auto text-center px-6 py-24">
        <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
          You are allowed to <span className="text-gold">heal</span>,<br />
          and you are allowed to be <span className="text-gold">chosen</span> — starting with you.
        </h1>
        <p className="mt-6 text-lg text-ink/70 max-w-2xl mx-auto">
          Mama Heal is a daily space for women to put themselves first — whether you're
          healing from a breakup, rebuilding your self-worth, or learning to nurture your
          relationship as fiercely as you nurture your children.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a href="/signup" className="btn-gold">Start your 5-day free trial</a>
          <a href="/library" className="btn-outline">Explore the library</a>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="font-serif text-xl font-bold mb-2">💛 Self-Love Practice</h3>
          <p className="text-ink/70 text-sm">
            Daily affirmations and guided journaling to rebuild your relationship with yourself.
          </p>
        </div>
        <div className="card">
          <h3 className="font-serif text-xl font-bold mb-2">💔 Breakup Healing</h3>
          <p className="text-ink/70 text-sm">
            Sessions to process heartbreak, release what's gone, and come back to yourself.
          </p>
        </div>
        <div className="card">
          <h3 className="font-serif text-xl font-bold mb-2">💑 Relationship & Partner Focus</h3>
          <p className="text-ink/70 text-sm">
            For women in relationships: guidance on prioritizing your partner, not just your
            children — because your children will grow and leave, but your relationship remains.
          </p>
        </div>
      </section>

      <section className="bg-ink text-white py-16">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-2xl font-serif font-bold mb-3">Her Healing. Her Power. Her Legacy.</h2>
          <p className="text-white/70 mb-6">
            5 days free. Then R300/month. Cancel anytime.
          </p>
          <a href="/signup" className="btn-gold">Begin Your Healing Journey</a>
        </div>
      </section>
    </div>
  )
}
