import { NextResponse } from 'next/server'
import { createServerClient } from '../../../../lib/supabaseServer'
import { STAGES } from '../../../../lib/journeyStages'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }

    const supabase = createServerClient()
    const { data: journey, error } = await supabase
      .from('journeys')
      .select('*')
      .eq('user_id', userId)
      .order('started_at', { ascending: false })
      .limit(1)
      .single()

    if (error) throw error

    const stageName = STAGES[journey.track][journey.current_stage - 1]?.name

    return NextResponse.json({ journey, stageName })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
