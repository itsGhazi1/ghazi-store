/**
 * GHAZY ORDER API — GOOGLE APPS SCRIPT
 *
 * SETUP
 * 1. Create a Google Sheet and open Extensions > Apps Script.
 * 2. Paste this entire file into Code.gs.
 * 3. Optionally paste the Sheet ID into SPREADSHEET_ID. When this script is
 *    opened from the target Sheet, leaving it blank uses that active Sheet.
 * 4. Deploy > New deployment > Web app.
 * 5. Execute as: Me. Who has access: Anyone.
 * 6. Copy the Web app URL into GOOGLE_SCRIPT_URL in script.js.
 * 7. Run setupSheet() once from the Apps Script editor to add the headers.
 */

const SPREADSHEET_ID = "";
const SHEET_NAME = "Orders";
const HEADERS = [
  "Order Number",
  "Date",
  "Time",
  "Customer Name",
  "Phone",
  "WhatsApp",
  "Email",
  "Governorate",
  "City",
  "Address",
  "Notes",
  "Payment Method",
  "Transaction Reference",
  "Discount Code",
  "Discount Amount",
  "Shipping Cost",
  "Subtotal",
  "Final Total",
  "Products Summary",
  "Products JSON"
];

function doGet() {
  return jsonResponse_({
    status: "success",
    message: "Ghazy Order API is online. Send orders with POST."
  });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);

    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("The request body is empty.");
    }

    const order = JSON.parse(e.postData.contents);
    validateOrder_(order);

    const sheet = getOrdersSheet_();
    ensureHeaders_(sheet);

    // Resolve collisions caused by separate customer devices sharing a local sequence.
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const existing = sheet.getRange(2, 1, lastRow - 1, 1)
        .createTextFinder(String(order.orderNumber))
        .matchEntireCell(true)
        .findNext();
      if (existing) {
        order.orderNumber = nextOrderNumber_(sheet);
      }
    }

    sheet.appendRow([
      safe_(order.orderNumber),
      safe_(order.date),
      safe_(order.time),
      safe_(order.customerName),
      safe_(order.phone),
      safe_(order.whatsapp),
      safe_(order.email),
      safe_(order.governorate),
      safe_(order.city),
      safe_(order.address),
      safe_(order.notes),
      safe_(order.paymentMethod),
      safe_(order.transactionReference),
      safe_(order.discountCode),
      number_(order.discountAmount),
      number_(order.shippingCost),
      number_(order.subtotal),
      number_(order.finalTotal),
      productsSummary_(order.products || []),
      JSON.stringify(order.products || [])
    ]);

    const row = sheet.getLastRow();
    sheet.getRange(row, 1, 1, HEADERS.length).setVerticalAlignment("middle");
    sheet.getRange(row, 15, 1, 4).setNumberFormat('#,##0.00 "EGP"');

    return jsonResponse_({
      status: "success",
      message: "Order saved successfully.",
      orderNumber: order.orderNumber
    });
  } catch (error) {
    console.error(error);
    return jsonResponse_({
      status: "error",
      message: error.message || "Unable to save order."
    });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

/** Run once manually after creating the Apps Script project. */
function setupSheet() {
  const sheet = getOrdersSheet_();
  ensureHeaders_(sheet);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setBackground("#0D0D0D")
    .setFontColor("#F2F2F2")
    .setFontWeight("bold");
  sheet.autoResizeColumns(1, HEADERS.length);
  sheet.setColumnWidth(19, 420);
  sheet.setColumnWidth(20, 420);
}

function getOrdersSheet_() {
  const spreadsheet = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();

  if (!spreadsheet) {
    throw new Error("No spreadsheet found. Add SPREADSHEET_ID in the script settings.");
  }

  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    setupHeaderStyle_(sheet);
    return;
  }

  const lastColumn = Math.max(sheet.getLastColumn(), HEADERS.length);
  const current = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const missingHeaders = HEADERS.filter(header => current.indexOf(header) === -1);
  if (!missingHeaders.length) return;

  const oldHeaders = HEADERS.filter(header => header !== "Products Summary");
  const oldLayoutMatches = oldHeaders.every((header, index) => current[index] === header);
  if (oldLayoutMatches && missingHeaders.length === 1 && missingHeaders[0] === "Products Summary") {
    sheet.insertColumnBefore(19);
    sheet.getRange(1, 19).setValue("Products Summary");
    setupHeaderStyle_(sheet);
    return;
  }

  const matches = HEADERS.every((header, index) => current[index] === header);
  if (!matches) {
    throw new Error("The Orders sheet headers do not match the required Ghazy columns.");
  }
}

function setupHeaderStyle_(sheet) {
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setBackground("#0D0D0D")
    .setFontColor("#F2F2F2")
    .setFontWeight("bold");
}

function validateOrder_(order) {
  const required = [
    "orderNumber", "date", "time", "customerName", "phone",
    "governorate", "city", "address", "paymentMethod",
    "subtotal", "finalTotal", "products"
  ];

  required.forEach(key => {
    if (order[key] === undefined || order[key] === null || order[key] === "") {
      throw new Error("Missing required field: " + key);
    }
  });

  if (!/^GHZ-\d{4}-\d{4,}$/.test(String(order.orderNumber))) {
    throw new Error("Invalid order number format.");
  }
  if (!Array.isArray(order.products) || order.products.length === 0) {
    throw new Error("The order must contain at least one product.");
  }
  if (number_(order.finalTotal) < 0 || number_(order.subtotal) < 0) {
    throw new Error("Order totals cannot be negative.");
  }
}

function nextOrderNumber_(sheet) {
  const year = new Date().getFullYear();
  const prefix = "GHZ-" + year + "-";
  const values = sheet.getLastRow() > 1
    ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getDisplayValues().flat()
    : [];
  const highest = values.reduce((max, value) => {
    if (String(value).indexOf(prefix) !== 0) return max;
    const sequence = Number(String(value).slice(prefix.length));
    return Number.isFinite(sequence) ? Math.max(max, sequence) : max;
  }, 0);
  return prefix + String(highest + 1).padStart(4, "0");
}

// Prefix formula-like input so customer text cannot execute as a Sheet formula.
function safe_(value) {
  const text = String(value === undefined || value === null ? "" : value).trim();
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function number_(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function productsSummary_(products) {
  return products.map(product => {
    const fit = product.fitLabel || product.fit || "Oversized";
    return [
      safe_(product.name),
      safe_(fit),
      safe_(product.size),
      safe_(product.color),
      "x" + number_(product.quantity),
      number_(product.total) + " EGP"
    ].join(" | ");
  }).join("\n");
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
