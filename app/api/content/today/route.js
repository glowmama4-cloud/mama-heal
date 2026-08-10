import { NextResponse } from 'next/server'
import { createServerClient } from '../../../../lib/supabaseServer'
import { DAYS_PER_STAGE } from '../../../../lib/journeyStages'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }

    const supabase = createServerClient()

    const { data: journey, error: journeyError } = await supabase
      .from('journeys')
      .select('*')
      .eq('user_id', userId)
      .order('started_at', { ascending: false })
      .limit(1)
      .single()

    if (journeyError) throw journeyError

    const { data: entries, error: entriesError } = await supabase
      .from('journal_entries')
      .select('created_at')
      .eq('journey_id', journey.id)

    if (entriesError) throw entriesError

    const activeDays = new Set(
      entries.map((e) => new Date(e.created_at).toDateString())
    ).size

    const dayInStage = (activeDays % DAYS_PER_STAGE) + 1

    const { data: content, error: contentError } = await supabase
      .from('content')
      .select('content_type, content_text')
      .eq('track', journey.track)
      .eq('stage_number', journey.current_stage)
      .eq('day_number', dayInStage)

    if (contentError) throw contentError

    const affirmation = content.find((c) => c.content_type === 'affirmation')?.content_text
    const prompts = content.filter((c) => c.content_type === 'prompt').map((c) => c.content_text)

    return NextResponse.json({
      track: journey.track,
      stage: journey.current_stage,
      dayInStage,
      affirmation,
      prompts,
    })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
