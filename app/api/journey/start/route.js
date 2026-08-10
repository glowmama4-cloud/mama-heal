import { NextResponse } from 'next/server'
import { createServerClient } from '../../../../lib/supabaseServer'

export async function POST(request) {
  try {
    const { userId, track } = await request.json()
    if (!userId || !track) {
      return NextResponse.json({ error: 'Missing userId or track' }, { status: 400 })
    }

    const validTracks = ['breakup_healing', 'relationship_focus', 'self_love']
    if (!validTracks.includes(track)) {
      return NextResponse.json({ error: 'Invalid track' }, { status: 400 })
    }

    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('journeys')
      .insert({ user_id: userId, track })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ journey: data })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
