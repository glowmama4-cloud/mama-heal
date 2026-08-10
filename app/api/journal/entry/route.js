import { NextResponse } from 'next/server'
import { createServerClient } from '../../../../lib/supabaseServer'
import { DAYS_PER_STAGE } from '../../../../lib/journeyStages'

export async function POST(request) {
  try {
    const { userId, journeyId, entryText, moodScore } = await request.json()
    if (!userId || !journeyId || !entryText) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createServerClient()

    const { error: insertError } = await supabase
      .from('journal_entries')
      .insert({
        user_id: userId,
        journey_id: journeyId,
        entry_text: entryText,
        mood_score: moodScore || null,
      })

    if (insertError) throw insertError

    const { data: entries, error: fetchError } = await supabase
      .from('journal_entries')
      .select('created_at')
      .eq('journey_id', journeyId)

    if (fetchError) throw fetchError

    const activeDays = new Set(
      entries.map((e) => new Date(e.created_at).toDateString())
    ).size

    const newStage = Math.min(Math.floor(activeDays / DAYS_PER_STAGE) + 1, 4)

    const { data: journey, error: journeyError } = await supabase
      .from('journeys')
      .update({ current_stage: newStage, updated_at: new Date().toISOString() })
      .eq('id', journeyId)
      .select()
      .single()

    if (journeyError) throw journeyError

    return NextResponse.json({ journey, activeDays })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
