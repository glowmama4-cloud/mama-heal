import { NextResponse } from 'next/server'
import crypto from 'crypto'

const PAYFAST_URL =
  process.env.PAYFAST_MODE === 'sandbox'
    ? 'https://sandbox.payfast.co.za/eng/process'
    : 'https://www.payfast.co.za/eng/process'

function pfEncode(value) {
  return encodeURIComponent(value.toString())
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
    getString += `&passphrase=${pfEncode(passphrase.trim())}`
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

    // Field order below MUST match PayFast's required signature order:
    // merchant details -> buyer details -> transaction details -> custom fields ->
    // transaction options -> payment method -> recurring billing details
    const data = {
      merchant_id: (process.env.PAYFAST_MERCHANT_ID || '').trim(),
      merchant_key: (process.env.PAYFAST_MERCHANT_KEY || '').trim(),
      return_url: `${siteUrl}/dashboard?payment=success`,
      cancel_url: `${siteUrl}/pricing?payment=cancelled`,
      notify_url: `${siteUrl}/api/payfast/notify`,
      email_address: email.trim(),
      m_payment_id: `${userId}-${Date.now()}`,
      amount,
      item_name: 'Mama Heal Membership',
      custom_str1: userId,          // moved up — must come before subscription fields
      subscription_type: '1',
      recurring_amount: amount,
      frequency: '3',
      cycles: '0',
    }

    const passphrase = (process.env.PAYFAST_PASSPHRASE || '').trim()
    const signature = buildSignature(data, passphrase)

    console.log('PAYFAST DEBUG:', {
      mode: process.env.PAYFAST_MODE,
      merchantIdPreview: data.merchant_id.slice(0, 4) + '...' + data.merchant_id.slice(-2),
      merchantKeySet: !!data.merchant_key,
      passphraseLength: passphrase.length,
      signature,
    })

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
