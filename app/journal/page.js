'use client'
import { useState } from 'react'

const prompts = [
  "What does putting myself first look like today?",
  "What am I still carrying from a past relationship that I can release?",
  "How did I show up for my partner today — and how did I show up for myself?",
  "What is one thing I need that I haven't asked for?",
]

export default function Journal() {
  const [entry, setEntry] = useState('')
  const [prompt] = useState(prompts[Math.floor(Math.random() * prompts.length)])
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-serif font-bold mb-2">Today's Journal</h1>
      <p className="text-ink/70 mb-8 italic">"{prompt}"</p>

      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write freely, no one is judging you here..."
        className="w-full h-64 p-4 rounded-xl border border-gold/30 focus:outline-none focus:ring-2 focus:ring-gold"
      />

      <div className="mt-4 flex items-center gap-4">
        <button onClick={handleSave} className="btn-gold">Save entry</button>
        {saved && <span className="text-sm text-gold font-medium">Saved 💛</span>}
      </div>
    </div>
  )
}
