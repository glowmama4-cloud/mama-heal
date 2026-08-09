import { NextResponse } from 'next/server'
import crypto from 'crypto'

const PAYFAST_URL =
  process.env.PAYFAST_MODE === 'sandbox'
    ? 'https://sandbox.payfast.co.za/eng/process'
    : 'https://www.payfast.co.za/eng/process'

function pfEncode(value) {
  return encodeURIComponent(value.toString().trim())
    .replace(/%20/g, '+')
    .replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase())
}

function buildSignature(data, passphrase) {
  let pfOutput = ''
  for (const key of Object.keys(data)) {
    if (data[key] !== '' && data[key] !== undefined && data[key] !== null) {
      pfOutput += `${key}=${pfEncode(data[key])}&`
    }
  }
  let getString = pfOutput.slice(0, -1)
  if (passphrase) {
    getString += `&passphrase=${pfEncode(passphrase)}`
  }
  return crypto.createHash('md5').update(getString).digest('hex')
}

export async function POST(request) {
  try {
    const { userId, email, plan } = await request.json()

    if (!userId || !email) {
      return NextResponse.json({ error: 'Missing user info' }, { status: 400 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mamaglow.co.za'
    const amount = plan === 'annual' ? '3000.00' : '300.00'

    const data = {
      merchant_id: process.env.PAYFAST_MERCHANT_ID,
      merchant_key: process.env.PAYFAST_MERCHANT_KEY,
      return_url: `${siteUrl}/dashboard?payment=success`,
      cancel_url: `${siteUrl}/pricing?payment=cancelled`,
      notify_url: `${siteUrl}/api/payfast/notify`,
      email_address: email,
      m_payment_id: `${userId}-${Date.now()}`,
      amount,
      item_name: 'Mama Heal Membership',
      subscription_type: '1',
      recurring_amount: amount,
      frequency: '3',
      cycles: '0',
      custom_str1: userId,
    }

    const signature = buildSignature(data, process.env.PAYFAST_PASSPHRASE)
    const params = new URLSearchParams({ ...data, signature })

    const html = `
      <html><body onload="document.forms[0].submit()">
        <form action="${PAYFAST_URL}" method="post">
          ${Array.from(params.entries())
            .map(([k, v]) => `<input type="hidden" name="${k}" value="${v}" />`)
            .join('\n')}
        </form>
      </body></html>
    `

    return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
