import { google } from "googleapis";
import { Readable } from "stream";

const auth = new google.auth.GoogleAuth({
  credentials: {
    type: "service_account",
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: "d19ca3456225bfbbc6e1fd9f0f781e6654b32eec",
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  },
  scopes: [
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

const drive = google.drive({ version: "v3", auth });
const sheets = google.sheets({ version: "v4", auth });

export async function uploadFileToDrive(
  fileName: string,
  fileBuffer: Buffer,
  mimeType: string
): Promise<string> {
  try {
    console.log("uploadFileToDrive:", { fileName, mimeType, bufferSize: fileBuffer.length });

    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
      },
      media: {
        mimeType,
        body: Readable.from(fileBuffer),
      },
      fields: "id, webViewLink",
    });

    console.log("File uploaded:", response.data.id);
    return response.data.webViewLink || "";
  } catch (error) {
    console.error("Drive upload error:", error instanceof Error ? error.message : error);
    throw error;
  }
}

export async function appendToSheet(
  values: (string | number | null)[][]
): Promise<void> {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID!,
      range: "'Jual PO'!A:J",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });
  } catch (error) {
    console.error("Error appending to Sheet:", error);
    throw error;
  }
}

export async function getSheetData(): Promise<any[][]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID!,
      range: "'Jual PO'!A2:J",
    });

    return response.data.values || [];
  } catch (error) {
    console.error("Error reading Sheet:", error);
    return [];
  }
}

export async function getPartsSheetData(): Promise<any[][]> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID!,
      range: "'Parts'!A2:H",
    });

    return response.data.values || [];
  } catch (error) {
    console.error("Error reading Parts sheet:", error);
    return [];
  }
}

async function ensureSheetTabExists(
  sheetName: string,
  headerRow?: string[]
): Promise<void> {
  const meta = await sheets.spreadsheets.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID!,
  });
  const exists = meta.data.sheets?.some(
    (s) => s.properties?.title === sheetName
  );
  if (exists) return;

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID!,
    requestBody: {
      requests: [{ addSheet: { properties: { title: sheetName } } }],
    },
  });

  if (headerRow) {
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID!,
      range: `'${sheetName}'!A:Z`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [headerRow] },
    });
  }
}

// Generic append to any tab in the same spreadsheet. Auto-creates the tab
// (with an optional header row) if it doesn't exist yet, so a renamed or
// missing tab doesn't hard-fail the request.
export async function appendToSheetTab(
  sheetName: string,
  values: (string | number | null)[][],
  headerRow?: string[]
): Promise<void> {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID!,
      range: `'${sheetName}'!A:Z`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("Unable to parse range")) {
      await ensureSheetTabExists(sheetName, headerRow);
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEETS_ID!,
        range: `'${sheetName}'!A:Z`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values },
      });
      return;
    }
    console.error(`Error appending to Sheet tab "${sheetName}":`, error);
    throw error;
  }
}
