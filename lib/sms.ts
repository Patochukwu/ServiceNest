export async function sendAdminNewBookingSMS(booking: {
  customerName: string;
  serviceName: string;
  date: string;
  timeSlot: string;
}) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;
  const adminPhoneNumber = process.env.ADMIN_PHONE_NUMBER || process.env.BUSINESS_PHONE;

  const smsBody = `ServiceNest Alert: New booking request from ${booking.customerName} for ${booking.serviceName} on ${booking.date} at ${booking.timeSlot}. Log in to the admin panel to approve.`;

  // Always log notification contents to stdout/logs for easy verification and debugging
  console.log(`[SMS ALERT LOG] Target: ${adminPhoneNumber || 'Not Set'} | Content: ${smsBody}`);

  if (!accountSid || !authToken || !fromNumber || !adminPhoneNumber) {
    console.warn('[SMS ALERT WARNING] Twilio credentials or ADMIN_PHONE_NUMBER not configured. SMS notification skipped.');
    return;
  }

  try {
    const authString = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${authString}`,
        },
        body: new URLSearchParams({
          To: adminPhoneNumber,
          From: fromNumber,
          Body: smsBody,
        }).toString(),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      console.error('[SMS ALERT ERROR] Twilio API Error Response:', data);
    } else {
      console.log('[SMS ALERT SUCCESS] SMS notification dispatched successfully to admin.');
    }
  } catch (err) {
    console.error('[SMS ALERT ERROR] Fetch exception during dispatch:', err);
  }
}
