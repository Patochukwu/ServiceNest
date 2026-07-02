import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // port 465 = SSL
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  connectionTimeout: 8000,
  greetingTimeout: 5000,
  socketTimeout: 8000,
});

const FROM = process.env.EMAIL_FROM || 'ServiceNest <noreply@servicenest.com>';

// True only when real credentials are present (not placeholders)
const isSMTPConfigured = !!(
  process.env.SMTP_USER &&
  process.env.SMTP_PASS &&
  !process.env.SMTP_USER.includes('your-email') &&
  !process.env.SMTP_PASS.includes('your-') &&
  !process.env.SMTP_PASS.includes('app-password')
);

// CID for the logo attachment — stable identifier referenced in HTML
const LOGO_CID = 'servicenest-logo@sn';
const LOGO_PATH = path.join(process.cwd(), 'public', 'logo.jpeg');
const LOGO_EXISTS = fs.existsSync(LOGO_PATH);

// Build the logo attachment object for Nodemailer (reused in every email)
function getLogoAttachment() {
  if (!LOGO_EXISTS) return [];
  return [
    {
      filename: 'logo.jpeg',
      path: LOGO_PATH,
      cid: LOGO_CID,        // Referenced in HTML as cid:servicenest-logo@sn
      contentType: 'image/jpeg',
    },
  ];
}

// Branded HTML email shell — logo is referenced via CID, no base64 needed
function brandedEmail(title: string, body: string): string {
  const logoImg = LOGO_EXISTS
    ? `<img src="cid:${LOGO_CID}" alt="ServiceNest Logo" width="120" height="120" style="display:block;margin:0 auto 8px;object-fit:contain;" />`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>ServiceNest</title>
</head>
<body style="margin:0;padding:0;background:#f9f6f2;font-family:'Helvetica Neue',Arial,sans-serif;color:#1a1a1a;">
  <div style="background:#f9f6f2;padding:28px 0;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.09);">

    <!-- HEADER -->
    <div style="text-align:center;padding:40px 32px 28px;background:#ffffff;border-bottom:3px solid #E8820C;">
      ${logoImg}
      <p style="margin:0;font-size:22px;font-weight:800;color:#1a1a1a;letter-spacing:-0.02em;">
        Service<span style="color:#E8820C;">Nest</span>
      </p>
      <p style="margin:6px 0 0;font-size:12px;color:#999;">North Dakota's Premier African Services</p>
    </div>

    <!-- CONTENT -->
    <div style="padding:36px 40px;">
      <h1 style="margin:0 0 18px;font-size:22px;font-weight:700;color:#1a1a1a;">${title}</h1>
      ${body}
    </div>

    <!-- FOOTER -->
    <div style="text-align:center;padding:24px 32px;background:#fdf8f3;border-top:1px solid #f0dfc0;font-size:13px;color:#aaa;">
      &copy; ${new Date().getFullYear()} ServiceNest &bull; North Dakota, USA<br>
      <a href="mailto:christiantus22@gmail.com" style="color:#E8820C;text-decoration:none;">christiantus22@gmail.com</a>
    </div>

  </div>
  </div>
</body>
</html>`;
}

// Shared info-box row helper (table-based for Outlook compatibility)
function infoRow(label: string, value: string): string {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:1px;">
    <tr>
      <td style="padding:9px 0;border-bottom:1px solid #eedec5;font-size:14px;color:#999;width:40%;">${label}</td>
      <td style="padding:9px 0;border-bottom:1px solid #eedec5;font-size:14px;color:#1a1a1a;font-weight:600;">${value}</td>
    </tr>
  </table>`;
}

// Helper: save a local HTML copy for dev preview
async function saveEmailCopyLocally(filename: string, html: string) {
  try {
    const dir = path.join(process.cwd(), 'public', 'emails');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, filename), html);
    console.log(`[EMAIL PREVIEW] http://localhost:3000/emails/${filename}`);
  } catch (err) {
    console.error('Failed to save email preview:', err);
  }
}

// ─────────────────────────────────────────────
// CUSTOMER: Booking received (pending)
// ─────────────────────────────────────────────
export async function sendBookingReceivedEmail(to: string, booking: {
  customerName: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  bookingId: string;
}) {
  const body = `
    <p style="font-size:15px;color:#555;line-height:1.75;margin:0 0 16px;">
      Hi <strong>${booking.customerName}</strong>, thank you for booking with us!
      We've received your request and will confirm it shortly.
    </p>
    <div style="background:#fdf8f3;border:1px solid #f0dfc0;border-radius:12px;padding:20px;margin:20px 0;">
      ${infoRow('Service', booking.serviceName)}
      ${infoRow('Date', booking.date)}
      ${infoRow('Time', booking.timeSlot)}
      ${infoRow('Booking ID', '#' + booking.bookingId.slice(0, 8).toUpperCase())}
      ${infoRow('Status', '<span style="color:#F59E0B;">⏳ Pending Confirmation</span>')}
    </div>
    <p style="font-size:15px;color:#555;line-height:1.75;margin:0 0 16px;">
      We'll email you again once your booking is confirmed.
      Questions? Reply to this email or call us.
    </p>
    <a href="tel:+17015550100"
       style="display:inline-block;background:linear-gradient(135deg,#E8820C,#FFA040);color:#ffffff;padding:14px 36px;border-radius:9999px;text-decoration:none;font-weight:700;font-size:15px;margin:8px 0;">
      Call Us: +1 (701) 555-0100
    </a>
  `;

  const html = brandedEmail('Booking Received! 🎉', body);
  await saveEmailCopyLocally(`customer-received-${booking.bookingId}.html`, html);

  if (!isSMTPConfigured) {
    console.log(`[EMAIL SIM] Customer booking received email → ${to}`);
    return;
  }

  try {
    await transporter.sendMail({
      from: FROM,
      to,
      subject: `Booking Received — ServiceNest #${booking.bookingId.slice(0, 8).toUpperCase()}`,
      html,
      attachments: getLogoAttachment(),
    });
    console.log(`[EMAIL OK] Booking received → ${to}`);
  } catch (err) {
    console.error('[EMAIL FAIL] booking received:', err);
  }
}

// ─────────────────────────────────────────────
// CUSTOMER: Booking confirmed by admin
// ─────────────────────────────────────────────
export async function sendBookingConfirmedEmail(to: string, booking: {
  customerName: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  bookingId: string;
}) {
  const body = `
    <p style="font-size:15px;color:#555;line-height:1.75;margin:0 0 16px;">
      Great news, <strong>${booking.customerName}</strong>! Your appointment has been
      <strong style="color:#22C55E;">confirmed</strong>. We look forward to seeing you!
    </p>
    <div style="background:#fdf8f3;border:1px solid #f0dfc0;border-radius:12px;padding:20px;margin:20px 0;">
      ${infoRow('Service', booking.serviceName)}
      ${infoRow('Date', booking.date)}
      ${infoRow('Time', booking.timeSlot)}
      ${infoRow('Booking ID', '#' + booking.bookingId.slice(0, 8).toUpperCase())}
      ${infoRow('Status', '<span style="color:#22C55E;">✅ Confirmed</span>')}
    </div>
    <p style="font-size:15px;color:#555;line-height:1.75;margin:0 0 16px;">
      📍 We're located in North Dakota. Please arrive 5–10 minutes early.
      Free cancellation up to 24 hours before your appointment.
    </p>
  `;

  const html = brandedEmail('Your Appointment is Confirmed! ✅', body);
  await saveEmailCopyLocally(`customer-confirmed-${booking.bookingId}.html`, html);

  if (!isSMTPConfigured) {
    console.log(`[EMAIL SIM] Customer confirmed email → ${to}`);
    return;
  }

  try {
    await transporter.sendMail({
      from: FROM,
      to,
      subject: `Appointment Confirmed — ServiceNest ✅`,
      html,
      attachments: getLogoAttachment(),
    });
    console.log(`[EMAIL OK] Booking confirmed → ${to}`);
  } catch (err) {
    console.error('[EMAIL FAIL] booking confirmed:', err);
  }
}

// ─────────────────────────────────────────────
// ADMIN: New booking notification
// ─────────────────────────────────────────────
export async function sendAdminNewBookingNotificationEmail(booking: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  date: string;
  timeSlot: string;
  bookingId: string;
  notes: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@servicenest.com';

  const body = `
    <p style="font-size:15px;color:#555;line-height:1.75;margin:0 0 16px;">
      A new booking request has just been submitted on ServiceNest.
    </p>
    <div style="background:#fdf8f3;border:1px solid #f0dfc0;border-radius:12px;padding:20px;margin:20px 0;">
      ${infoRow('Customer', booking.customerName)}
      ${infoRow('Email', booking.customerEmail)}
      ${infoRow('Phone', booking.customerPhone)}
      ${infoRow('Service', booking.serviceName)}
      ${infoRow('Date / Time', booking.date + ' at ' + booking.timeSlot)}
      ${infoRow('Notes', booking.notes || 'None')}
      ${infoRow('Booking Ref', '#' + booking.bookingId.slice(0, 8).toUpperCase())}
    </div>
    <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin"
       style="display:inline-block;background:linear-gradient(135deg,#E8820C,#FFA040);color:#ffffff;padding:14px 36px;border-radius:9999px;text-decoration:none;font-weight:700;font-size:15px;margin:8px 0;">
      Manage Booking →
    </a>
  `;

  const html = brandedEmail('New Booking Request 🚨', body);
  await saveEmailCopyLocally(`admin-new-booking-${booking.bookingId}.html`, html);

  if (!isSMTPConfigured) {
    console.log(`[EMAIL SIM] Admin notification email → ${adminEmail}`);
    return;
  }

  try {
    await transporter.sendMail({
      from: FROM,
      to: adminEmail,
      subject: `🚨 New Booking: ${booking.serviceName} — ServiceNest`,
      html,
      attachments: getLogoAttachment(),
    });
    console.log(`[EMAIL OK] Admin notified → ${adminEmail}`);
  } catch (err) {
    console.error('[EMAIL FAIL] admin notification:', err);
  }
}
