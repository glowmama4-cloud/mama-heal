import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const data = {}
    for (const [key, value] of formData.entries()) {
      data[key] = value
    }

    const paymentStatus = data.payment_status
    const userId = data.custom_str1
    const pfPaymentId = data.pf_payment_id

    if (paymentStatus === 'COMPLETE' && userId) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SECRET_KEY
      )

      const nextPeriodEnd = new Date()
      nextPeriodEnd.setMonth(nextPeriodEnd.getMonth() + 1)

      await supabase
        .from('profiles')
        .update({
          subscription_active: true,
          subscription_status: 'active',
          payfast_payment_id: pfPaymentId,
          current_period_end: nextPeriodEnd.toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
