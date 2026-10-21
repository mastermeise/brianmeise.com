/**
 * @OnlyCurrentDoc
 */
// Sign-ups for brianmeise.com: each email from the "More soon. Stay in the
// know." card becomes a row in this Google Sheet. @OnlyCurrentDoc (above)
// limits the script's access to this one spreadsheet.
//
// Setup (once):
//   1. In the Sheet: Extensions → Apps Script. Replace everything there with
//      this file and save.
//   2. Deploy → New deployment → type "Web app".
//      Execute as: Me.  Who has access: Anyone.  Deploy, then authorize.
//      (Google warns the app is unverified; it's your own script, so
//      Advanced → Go to project.)
//   3. Copy the Web app URL (ends in /exec) into the form's `action` in
//      v5/index.html.
// After editing this script later: Deploy → Manage deployments → edit →
// Version: New version, so the same /exec URL picks up the change.

const SHEET_NAME = 'Sign-ups';

function doPost(e) {
  const p = (e && e.parameter) || {};
  const email = String(p.email_address || '').trim().toLowerCase();

  // Honeypot: people never see the "website" field; bots fill it in.
  // Pretend it worked so they don't retry.
  if (p.website) return reply('success');

  // A plain address only. The first character can't be = + - @, so nothing
  // can turn into a spreadsheet formula.
  if (email.length > 254 || !/^[^\s@=+\-][^\s@]*@[^\s@]+\.[^\s@]+$/.test(email)) {
    return reply('failed');
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(['Signed up', 'Email']);
    const rows = sheet.getLastRow() - 1;
    const seen = rows > 0 ? sheet.getRange(2, 2, rows, 1).getValues().flat() : [];
    if (!seen.includes(email)) sheet.appendRow([new Date(), email]);
  } finally {
    lock.releaseLock();
  }
  return reply('success');
}

function reply(status) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: status }))
    .setMimeType(ContentService.MimeType.JSON);
}
