import './globals.css'

export const metadata = {
  title: 'Mama Heal | mamaglow.co.za',
  description: 'A daily healing space for women — self-love, breakups, and relationships. By MamaGlow.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-gold/30 bg-blush">
          <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
            <a href="/" className="text-xl font-serif font-bold text-ink">
              Mama <span className="text-gold">Heal</span>
            </a>
            <nav className="flex gap-6 text-sm font-medium">
              <a href="/library" className="hover:text-gold">Healing Library</a>
              <a href="/journal" className="hover:text-gold">Journal</a>
              <a href="/pricing" className="hover:text-gold">Pricing</a>
              <a href="/login" className="hover:text-gold">Log In</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-gold/30 mt-20 py-8 text-center text-sm text-ink/60">
          Mama Heal — part of the MamaGlow family · mamaglow.co.za
        </footer>
      </body>
    </html>
  )
}
