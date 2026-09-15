// Supabase Edge Function: send-sms
// Deploy with: supabase functions deploy send-sms
// Follows Deno environment runtime in Supabase Edge Functions

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to, message, senderId, provider = 'africastalking', apiKey, username } = await req.json()

    if (!to || !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required parameters: to and message.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const resolvedApiKey = apiKey || Deno.env.get('SMS_API_KEY') || Deno.env.get('AT_API_KEY') || ''
    const resolvedUsername = username || Deno.env.get('SMS_USERNAME') || Deno.env.get('AT_USERNAME') || 'sandbox'
    const resolvedSenderId = senderId || Deno.env.get('SMS_SENDER_ID') || ''

    if (provider === 'africastalking') {
      const isSandbox = resolvedUsername.toLowerCase() === 'sandbox'
      const endpoint = isSandbox
        ? 'https://api.sandbox.africastalking.com/version1/messaging'
        : 'https://api.africastalking.com/version1/messaging'

      const bodyParams = new URLSearchParams()
      bodyParams.append('username', resolvedUsername)
      bodyParams.append('to', to)
      bodyParams.append('message', message)
      if (resolvedSenderId && !isSandbox) {
        bodyParams.append('from', resolvedSenderId)
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'apiKey': resolvedApiKey,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: bodyParams.toString(),
      })

      const data = await res.json()
      return new Response(
        JSON.stringify({ success: res.ok, data, messageId: data?.SMSMessageData?.Recipients?.[0]?.messageId }),
        { status: res.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else if (provider === 'twilio') {
      const accountSid = resolvedUsername || Deno.env.get('TWILIO_ACCOUNT_SID') || ''
      const authToken = resolvedApiKey || Deno.env.get('TWILIO_AUTH_TOKEN') || ''
      const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`

      const bodyParams = new URLSearchParams()
      bodyParams.append('To', to)
      bodyParams.append('From', resolvedSenderId || Deno.env.get('TWILIO_PHONE_NUMBER') || '')
      bodyParams.append('Body', message)

      const authHeader = 'Basic ' + btoa(`${accountSid}:${authToken}`)
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: bodyParams.toString(),
      })

      const data = await res.json()
      return new Response(
        JSON.stringify({ success: res.ok, data, messageId: data.sid }),
        { status: res.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } else if (provider === 'advanta') {
      const endpoint = 'https://quicksms.advantasms.com/api/services/sendsms/'
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apikey: resolvedApiKey,
          partnerID: resolvedUsername || '1234',
          message: message,
          shortcode: resolvedSenderId || 'ADVANTA',
          mobile: to.replace('+', ''),
        }),
      })

      const data = await res.json()
      return new Response(
        JSON.stringify({ success: res.ok, data }),
        { status: res.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: false, error: `Unsupported SMS provider: ${provider}` }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

